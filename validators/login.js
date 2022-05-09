const Parser = require("smooth-validator");

module.exports = function validateLoginInput(data) {
  const rules = {
    email : 'required|email|min:5|max:100',
    password: 'required|min:6|max:30'
  }
  var verify = Parser(rules)
  return verify(data)
};
