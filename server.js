const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { DATABASE, DB_HOST, DB_PORT, SECRET_JWT_KEY, PROJECT_PORT } = require('./env');
const { Strategy }  = require("passport-jwt");

const app = express();

//Body parser for reading request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://' + DB_HOST + ':' + DB_PORT + '/'+DATABASE, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});


app.use('/user', require('./routes/user.routes'));

//jwt auth check middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader != "") {
    const token = authHeader.replace("Bearer ", "")
    const opts = {
      jwtFromRequest : token,
      secretOrKey : SECRET_JWT_KEY
    };
    Strategy.JwtVerifier(token, SECRET_JWT_KEY, opts, function(jwt_err, payload) {
      if (jwt_err) {
        return res.status(401).send({message: "invalid token"});
      } else {
        req.user = payload;
        next();
      }
    });
  } else {
    return res.status(401).send({message: "empty token"});
  }
};
app.use('/note', authenticateJWT, require('./routes/note.routes'));

// listen for requests
const port = PROJECT_PORT || 9052;
app.listen(port, () => {  console.log("Server is listening on port "+port); });
