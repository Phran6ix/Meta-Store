const bcrypt = require("bcrypt");

exports.comparePassword = async function (inputpassword, userpassword) {
  return await bcrypt.compare(inputpassword, userpassword);
};
