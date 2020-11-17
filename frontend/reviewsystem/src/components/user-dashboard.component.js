import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Form from "react-validation/build/form";



import { connect } from "react-redux";
import { addReview} from "../actions/review";

import UserService from "../services/user.service";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleReview = this.handleReview.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    
    
    this.state = {
       rating: 0,
       reviews: "",
       approve: 0,
       userId: 0,
       username:"",
       content:""
    };
  }

  onChangeRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  onChangeReview(e) {
    this.setState({
      reviews: e.target.value,
    });
  }

  onChangeUser(e) {
    this.setState({
      userId: e.target.value,
    });
  }

  handleReview(e) {
    e.preventDefault();

    this.setState({
      approve: 0
     
      
    });

    this.form.validateAll();
    
    console.log(this.state.userId);
      this.props
        .dispatch(
          
          addReview(this.state.reviews, this.state.rating, this.state.approve,this.state.userId,this.state.username)
          
        )
        .then(() => {
         
         alert("Thank you for submitting your review..Your review was received sucessfully!!!")
         this.setState({
          reviews: "", 
          rating:0
        });
        })
        .catch(() => {
          alert("We are sorry,your review was not recieved!!!");
          this.setState({
            reviews: "", 
            rating:0
          });
        });
    
  }
  componentDidMount() {
    const { user: currentUser } = this.props;
    this.setState({
      userId: currentUser.id,
      username: currentUser.username
     
      
    });

    
    UserService.getUserDashboard().then(
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
  }

  render() {
  
    return (
      <div className="container">
        <h1>A Simple Review System</h1>
        <header className="jumbotron">
        <Form
            onSubmit={this.handleReview}
            ref={(c) => {
              this.form = c;
            }}
          >
        <div className="col-12 col-lg-6 offset-lg-3">
        <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Please rate us 🚀🚀🚀</Typography>
        <Rating
          name="rating"
          value={this.state.rating}
          onChange={this.onChangeRating}
          validations={[required]}
        />
      </Box>
    
      
        <textarea  value={this.state.reviews} validations={[required]} className="form-control my-3" onChange={this.onChangeReview} placeholder="Enter Review here">
        </textarea>
        <button className="btn btn-primary float-right">Submit</button>
      </div>
      </Form>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(UserDashboard);
