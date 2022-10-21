const jwt = require("jsonwebtoken");

exports.sendToken = async function (id) {
  const token = jwt.sign(id, process.env.JWT_SECRET);

  return token;
};

exports.decode = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    console.error(error);
  }
};
