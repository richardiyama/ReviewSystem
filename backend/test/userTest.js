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
describe('Users', () => {
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
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1/users/index')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              
            });
            done();
      });
  });


  describe('/GET guest view', () => {
    it('it should GET guests view', (done) => {
      chai.request(server)
          .get('/api/v1/users/guest')
          .end((err, res) => {
                res.should.have.status(200);
                
done();
          });
          
    });
});


 /*
  * Test the /POST route
  */
 describe('/POST user', () => {
    it('it should not POST a user without email field', (done) => {
        let user = {
            username: "onajiteohwerhi",
            password: "JAVA4real2019"
        }
      chai.request(server)
          .post('/api/v1/users/create')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('email');
            
          });
          done();
    });

    it('it should POST a user ', (done) => {
        let user = {
            username: "onajiteohwerhi",
            password: "JAVA4real2019",
            email:"ohwerhionajite@gmail.com"
        }
      chai.request(server)
          .post('/api/v1/users/create')
          .send(user)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(' Your registeration was successfull!..Proceed to the Login Page to use this System');
                res.body.user.should.have.property('username');
                res.body.user.should.have.property('password');
                res.body.user.should.have.property('email');
                
           
          });
          done();
    });
    
});

describe('/User authentication', () => {
    it('it should signin', (done) => {
        let user = {
            email: "ohwerhionajite@gmail.com",
            password: "JAVA4real2019"
        }
      chai.request(server)
          .post('/api/v1/users/signin')
          .send(user)
          .end((err, res) => {
                res.should.have.status(404);
            
          });
          done();
    });
});

describe('/GET user view', () => {
    it('it should GET user view', (done) => {
      chai.request(server)
          .get('/api/v1/users/user')
          .end((err, res) => {
                res.should.have.status(403);
            
                
               
          });

          done();
    });
});

describe('/GET admin view', () => {
    it('it should not GET admin view', (done) => {
      chai.request(server)
          .get('/api/v1/users/admin')
          .end((err, res) => {
                res.should.have.status(403);
                
                done();  
          });

         
    });
});
});
