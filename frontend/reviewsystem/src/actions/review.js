import {ADDREVIEW_SUCCESS,ADDREVIEW_FAIL,SET_MESSAGE} from "./types";
  
  import ReviewService from "../services/review.service";

  export const addReview = (reviews, rating, approve,userId,username) => (dispatch) => {
    return ReviewService.addReview(reviews, rating, approve,userId,username).then(
      (response) => {
        dispatch({
          type: ADDREVIEW_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADDREVIEW_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };


  


  