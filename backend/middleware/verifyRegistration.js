const db = require("../models");



checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  db.users.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    db.users.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
    const ROLES = ["user", "admin"];
  if (req.body.Roles) {
    for (let i = 0; i < req.body.Roles.length; i++) {
      if (!ROLES.includes(req.body.Roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.Roles[i] 
        });
        return;
      }
    }
  }
  
  next();
};

const verifyRegistration = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifyRegistration;