import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import  {addReviewReducer} from "./review";

export default combineReducers({
  auth,
  message,
  addReviewReducer
});