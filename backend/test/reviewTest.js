//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
const db = require("../models");
const Role = db.roles;
chai.use(chaiHttp);


function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
   
   
  }
//Our parent block
describe('Reviews', () => {
    beforeEach((done) => { //Before each test we empty the database
       db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db');
        initial();
        
       });
       
        done();
    });

/*
  * Test the /GET route
  */
  describe('/GET review', () => {
      it('it should GET all the reviews', (done) => {
        chai.request(server)
            .get('/api/v1/reviews/getAllReview')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              
            });
            done();
      });
  });


  

 /*
  * Test the /POST route
  */
 describe('/POST review', () => {
    it('it should not POST a user without user ID', (done) => {
        let review = {
            reviews:"Great product",
         rating:4,
         approve:0,
         username: "seuniyama"
        }
      chai.request(server)
          .post('/api/v1/reviews/create')
          .send(review)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('userId');
            
          });
          done();
    });

    it('it should POST a review ', (done) => {
        let review = {
            reviews:"Great product",
         rating:4,
         approve:0,
         userId:1,
         username: "seuniyama"
        }
      chai.request(server)
          .post('/api/v1/reviews/create')
          .send(review)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.review.should.have.property('username');
                res.body.review.should.have.property('rating');
                res.body.review.should.have.property('approve');
                
           
          });
          done();
    });
    
});


});
