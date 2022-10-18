const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const accessToken = jwt.sign(
    { email: user },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["Token"];
  // console.log("Token " + accessToken);
  if (!accessToken || !emailToken) {
    res.sendStatus(403);
  } else {
    try {
      const validToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
      req.token = validToken;
      return next();
    } catch (error) {
      console.log("[jwt.js].validateToken catch error "+error);
      res.sendStatus(403);;
    }
  }
};

const validateClient = (req, res, next) => {
  const accessToken = req.cookie["emailToken"];
  // console.log("Token " + accessToken);
  if (!accessToken) {
    res.sendStatus(403);
  } else {
    try {
      const validToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
      req.token = validToken;
      return next();
    } catch (error) {
      console.log("[jwt.js].validateToken catch error "+error);
      res.sendStatus(403);;
    }
  }
};


module.exports = { createToken, validateToken, validateClient};
