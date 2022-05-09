const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../models/user.model');
const {SECRET_JWT_KEY, TOKEN_EXPIRATION_TIME} = require('../env');

var verifyLogin = require("../validators/login");
var verifyRegister = require("../validators/register");

exports.login = function(req, res) {
  console.log('User Controller: Login call')
  const new_user = new User(req.body);

  const data = verifyLogin(new_user);
  if(data.errors.length > 0) {
      return res.status(400).send(data);
  }

  User.findOne({email: new_user.email}).then( user => {
    if (!user) {
      return res.status(400).send({message:'user not found'});
    }
    bcrypt.compare(new_user.password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {id: user.id, email: user.email}; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          SECRET_JWT_KEY,
          {expiresIn: TOKEN_EXPIRATION_TIME},
          (err, token) => {
            return res.send({
              data: token,
              user: payload
            });
          }
        );
        return;
      } else {
        return res.status(400).send({message:'Password incorrect'});
      }
    });
  })
};

exports.register = function(req, res) {
  console.log('User Controller: Register call')
  const new_user = new User(req.body);

  const data = verifyRegister(req.body);
  if(data.errors.length > 0) {
    return res.status(400).send(data);
  }
  User.findOne({email: new_user.email}).then( user => {
    if (user != null) {
      return res.status(400).send({message:'email not available'});
    }
    User.create(new_user, function(err, user) {
      if (err != null) {
        res.status(400).send(err);
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save()
              .then(user => {
                console.log("password updated")
              })
              .catch(err => console.log(err));
          });
        });
        const payload = {id: user.id, email: user.email}; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          SECRET_JWT_KEY,
          {expiresIn: TOKEN_EXPIRATION_TIME},
          (err, token) => {
            if (err != null) {
              return res.status(400).send({data: err});
            }
            return res.send({
              data: token,
              user: payload
            });
          }
        );
      }
    });
  });
};