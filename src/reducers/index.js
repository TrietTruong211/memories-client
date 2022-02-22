import { combineReducers } from "redux";
import posts from "./posts";
import authReducer from "./auth";

export default combineReducers({
  // posts: posts //key and values are the same, we can keep only one
  posts,
  authReducer,
});
