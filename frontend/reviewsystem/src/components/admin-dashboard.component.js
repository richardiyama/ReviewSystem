import React, { Component } from "react";


import UserService from "../services/user.service";
import ReviewService from "../services/review.service";

class AdminDashboard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      content:"",
      approve: true
    };
  }

  
  componentDidMount() {
    UserService.getAdminDashboard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

    ReviewService.listReviews().then(
      response => {
        this.setState({
          reviews: response.data
          
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );

  }

    
    

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        <table className="table table-striped">
    <thead>
        <tr>
          <td>User Name</td>
          <td>Review</td>
          <td>Rating</td>
          

          <td>Action</td>
        </tr>
    </thead>
    <tbody>
    {this.state.reviews.map(review =>
        <tr>
       
        <td>{review.username}</td>
    <td>{review.reviews}</td>
            <td className="review_rating">{ Array(review.rating)
                    .fill()
                    .map((_) => (
                        <p>
                        ⭐
                    </p>
                     
                    ))}</td>
           
           
          
           
            <td>
            
   
            <button onClick={() => ReviewService.approveReview(review.id,this.state.approve)? alert("This review have been approved successfully!!!"):alert("This review have been approved !!!")  } className="btn btn-primary float-right">Approve</button>
         
            
         
            
                     </td>
              
        </tr>
    )}
    </tbody>
  </table>
        </header>
      </div>
    );
  }
}


export default AdminDashboard