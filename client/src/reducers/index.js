import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";
import tagsReducer from "./tag";
import messagesReducer from "./message";
import faqReducer from "./faqReducer"

export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  usersReducer,
  tagsReducer,
  faqReducer, // just added
  messagesReducer
});
