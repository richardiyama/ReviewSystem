import {ADDREVIEW_SUCCESS,ADDREVIEW_FAIL} from "../actions/types";

function addReviewReducer (state = {}, action) {
    const { type} = action;
  
    switch (type) {
      case ADDREVIEW_SUCCESS:
        return {
          ...state
        };
      case ADDREVIEW_FAIL:
        return {
          ...state
        };
      
      default:
        return state;
    }
  }


  

  export  {addReviewReducer}