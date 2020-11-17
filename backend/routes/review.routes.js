const express = require("express");
const router = express.Router();

const db = require("../models");


router.post("/create", async(req,res) =>{
    await db.reviews.create({
         reviews:req.body.reviews,
         rating:req.body.rating,
         approve:req.body.approve,
         userId:req.body.userId,
         username: req.body.username
        
 
 
     }).then(review => res.send(review));
 });
 
 router.put("/approve", async(req,res) =>{
db.reviews.update(
    {
       approve:req.body.approve 
    },

    {
        where:{id: req.body.id}
    }
).then(() => res.send("success"));
    });

 router.get("/getAllReviewByUserId/:id", async(req,res) =>{
     await db.reviews.findAll({
     where:{userId: req.params.id},
     include: [db.users]
     }).then(review => res.send(review))
 })

 router.get("/getAllReview", async(req,res) =>{
    await db.reviews.findAll({
    include: [db.users]
    }).then(review => res.send(review))
})
module.exports = router;