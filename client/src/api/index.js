import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8200"
  // "https://stack-overflow-eight.vercel.app/",
});

const FAQ_Api = axios.create({
  baseURL: "http://127.0.0.1:8200"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token
      }`;
  }
  return req;
});

//function login&signup
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

//functionn question 
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const getAllTags = () => API.get("/tag/tags");

export const getMessages = (from, to) => API.get(`/message/messages/${from}/${to}`);

export const chatgptReq = (id) => API.post(`/chatgpt/chatgpt/${id}`);

export const getFAQs = async () => {
  try {
    const response = await FAQ_Api.get("/get_faqs")
    return response.data;
  } catch (error) {
    console.log("Error While Fecthing FAQs", error);
    return [];
  }
}

export const updateFAQs = async () => {
  try {
    const response = await FAQ_Api.post("/update_faqs");
    return response.data;
  } catch (error) {
    console.log("Error while Updating FAQs", error);
  }
} 