const express = require("express");
const router = express.Router();
const config = require("../config/auth.config");
const db = require("../models");

const { authJwt,verifyRegistration} = require("../middleware");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


router.post("/create",[
    verifyRegistration.checkDuplicateUsernameOrEmail,
    verifyRegistration.checkRolesExisted
  ], async(req,res) =>{
   await db.users.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 8)


    }).then(user => {
        
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "Your registeration was successfull!..Proceed to the Login Page to use this System"});
          });
        }
      )
      .catch(err => {
        res.status(500).send({ message: err.message});
      });
});

router.post("/signin", async(req, res) => {
   await db.users.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

router.get("/index", async(req,res) =>{
    await db.users.findAll({
        include:[db.reviews]
    }).then(users => res.send(users));
});


router.get("/guest",(req,res) =>{
  res.status(200).send("Welcome to our review system..Please proceed to the sign up page to register into the system or signin to submit your reviews..");
});

router.get("/user",[authJwt.verifyToken],(req,res) =>{
  res.status(200).send("User Content.");
});

router.get("/admin",[authJwt.verifyToken, authJwt.isAdmin],(req,res) =>{
  res.status(200).send("Admin Content.");
});
module.exports = router;