import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/reviews/";

class ReviewService {
    addReview(reviews, rating, approve,userId,username) {
        return axios.post(API_URL + "create", {
          reviews,
          rating,
          approve,
          userId,
          username,
        });
      }

      approveReview(id,approve) {
        return axios.put(API_URL + "approve", {
          id,
         approve
        });
      }


    listReviews() {
        return axios.get(API_URL + 'getAllReview');
      }

    }
    export default new ReviewService();   
