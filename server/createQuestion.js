// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// dotenv.config();

// const createQuestion = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/questions/Ask', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer YOUR_JWT_TOKEN_HERE`, // הכנס את אסימון ה-JWT שלך כאן
//       },
//       body: JSON.stringify({
//         questionTitle: 'How to use OpenAI API?',
//         questionBody: 'I want to know how to use OpenAI API in my project.',
//         questionTags: ['openai', 'api'],
//         userPosted: 'test_user',
//         userId: '1',
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Question created:', data);

//     // שמירת ה-ID של השאלה החדשה
//     const questionId = data._id;
//     console.log('Question ID:', questionId);
//   } catch (error) {
//     console.error('Error creating question:', error);
//   }
// };

// createQuestion();
