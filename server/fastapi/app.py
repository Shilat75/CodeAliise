from fastapi import FastAPI
from pymongo import MongoClient
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from bson import ObjectId
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
import ast
import os
from groq import Groq
import re
from tqdm import tqdm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the list of allowed origins for CORS
origins = [
    "http://localhost:3000",    # React frontend
    "http://127.0.0.1:3000",    # Alternative React frontend
    "http://localhost:8200",    # Node.js backend
    "http://127.0.0.1:8200"     # Alternative Node.js backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection URI
uri = 'mongodb+srv://hakimi5757:hakimi5757@cluster0.zvtc2kf.mongodb.net/clouser0?retryWrites=true&w=majority'
client = MongoClient(uri)
db = client.get_database('clouser0')
questions_collection = db.get_collection('questions')
embeddings_collection = db.get_collection('question_embeddings')
clusters_collection = db.get_collection('clusters')

model_name = "BAAI/bge-small-en"
model_kwargs = {"device": "cpu"}
encode_kwargs = {"normalize_embeddings": True}
hf = HuggingFaceBgeEmbeddings(
    model_name=model_name, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs
)

def cluster_questions(embeddings, threshold=0.9):
    similarity_matrix = cosine_similarity(embeddings)
    clusters = []
    clustered_items = set()

    for idx, row in enumerate(similarity_matrix):
        if idx in clustered_items:
            continue
        cluster = [idx]
        clustered_items.add(idx)
        for i, score in enumerate(row):
            if score > threshold and i != idx and i not in clustered_items:
                cluster.append(i)
                clustered_items.add(i)
        clusters.append(cluster)
    return clusters

def get_keywords(question, body):
    os.environ["GROQ_API_KEY"] = "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"
    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )
    Output_Format = '''
    Generated output format
    ```
{"Keywords": '[list of keywords]',
        "Title": "here title concise"
        }```
'''
    prompt = f'''You are an expert agent to extract the title and keywords from the following question in proper json format. Don't need to explain any irrelevant thing and just generate an output according to given output format and don't need to change anything.
    For the following Question:
    title: {question}
    body: {body}
    ''' + Output_Format
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama3-8b-8192",
    )
    return chat_completion.choices[0].message.content

def process_new_questions(question_title, question_body, hf, max_tries=5):
    embedding = None
    success = False
    tries = 0

    while not success and tries < max_tries:
        try:
            response = get_keywords(question_title, question_body)

            # Extract JSON from the response
            pattern = r'```(.*?)```'  # Extract markdown block
            matches = re.findall(pattern, response, re.DOTALL)

            if matches:
                json_data = ast.literal_eval(matches[0].strip())
                keywords = json_data['Keywords']
                title = json_data['Title']
                embedding = hf.embed_query(title)

                success = True  # Mark success as true to exit retry loop
            else:
                raise ValueError("No matches found in the response.")

        except Exception as e:
            tries += 1
            print(f"Error processing question '{question_title}': {e}. Retry {tries}/{max_tries}")
            if tries >= max_tries:
                print(f"Failed to process question '{question_title}' after {max_tries} attempts.")
                break  # Stop retrying after reaching the maximum number of tries

    return embedding

@app.get("/get_faqs")
def get_faqs():
    # Retrieve clusters from the database (precomputed clusters)
    clusters_doc = clusters_collection.find_one({}, {'_id': 0, 'clusters': 1})  # Only fetch the clusters field
    if clusters_doc and 'clusters' in clusters_doc:
        clusters_with_question_ids = clusters_doc['clusters']
    else:
        return {'clusters': []}  # Return empty if no clusters found

    # Fetch all the required questions in a single query for efficiency
    question_ids = [ObjectId(qid_str) for cluster in clusters_with_question_ids for qid_str in cluster]
    questions = questions_collection.find({'_id': {'$in': question_ids}}, {'_id': 1, 'questionTitle': 1, 'questionBody': 1})

    # Create a lookup dictionary for questions
    question_lookup = {str(q['_id']): q for q in questions}

    # Prepare clusters output by matching questions from the lookup dictionary
    clusters_output = []
    for cluster_question_ids in clusters_with_question_ids:
        cluster = []
        for qid_str in cluster_question_ids:
            question = question_lookup.get(qid_str, {'questionTitle': 'N/A', 'questionBody': 'N/A'})
            cluster.append({
                'question_id': qid_str,
                'question_title': question['questionTitle'],
                'question_body': question['questionBody']
            })
        clusters_output.append(cluster)

    return {'clusters': clusters_output}


@app.post("/update_faqs")
def update_faqs():
    # Get the list of all question IDs in the questions collection
    all_questions_cursor = questions_collection.find({}, {'_id': 1})
    all_question_ids = [doc['_id'] for doc in all_questions_cursor]

    # Get the list of question IDs for which embeddings already exist
    processed_questions_cursor = embeddings_collection.find({}, {'question_id': 1})
    processed_question_ids = [doc['question_id'] for doc in processed_questions_cursor]

    # Find new question IDs
    new_question_ids = set(all_question_ids) - set(processed_question_ids)
    print(new_question_ids)

    if new_question_ids:
        # Process new questions
        for question_id in tqdm(new_question_ids):
            question = questions_collection.find_one({'_id': question_id})
            question_title = question.get('questionTitle', 'N/A')
            question_body = question.get('questionBody', 'N/A')

            embedding = process_new_questions(question_title, question_body, hf, max_tries=10)

            if embedding is not None:
                # Store the embedding
                embeddings_collection.insert_one({
                    'question_id': question_id,
                    'embedding': embedding  # Convert numpy array to list for MongoDB storage
                })

    # Update clusters
    # Get all embeddings
    embeddings_cursor = embeddings_collection.find({})
    embeddings = []
    question_ids = []
    for doc in embeddings_cursor:
        embeddings.append(np.array(doc['embedding']))
        question_ids.append(doc['question_id'])

    if embeddings:
        embeddings = np.array(embeddings)

        # Cluster the embeddings
        clusters = cluster_questions(embeddings, threshold=0.9)

        # Map cluster indices to question IDs
        clusters_with_question_ids = []
        for cluster in clusters:
            cluster_question_ids = [str(question_ids[idx]) for idx in cluster]
            clusters_with_question_ids.append(cluster_question_ids)

        # Store clusters in the clusters collection
        clusters_collection.delete_many({})  # Clear previous clusters
        clusters_collection.insert_one({'clusters': clusters_with_question_ids})

    return {'status': 'FAQs updated successfully'}
