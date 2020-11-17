const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");

const Role = db.Role;

var corsOptions = {
    origin: "http://localhost:3001"
  };
  
 app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


const userRoutes = require("./routes/user.routes");
app.use("/api/v1/users",userRoutes);



const reviewRoutes = require("./routes/review.routes");
app.use("/api/v1/reviews",reviewRoutes);

db.sequelize.sync().then(() =>{
    app.listen(PORT, ()=>{
        console.log(`listening at: http://lochost:${PORT}`);
    });

    
})


module.exports = app;