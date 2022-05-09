const Parser = require("smooth-validator");

module.exports = function validateLoginInput(data) {
  const registerRules = {
    email : 'required|email|min:5|max:100',
    password: 'required|min:6|max:30',
    confirm_password: 'required|same:password'
  }
  var verify = Parser(registerRules)
  return verify(data)
};