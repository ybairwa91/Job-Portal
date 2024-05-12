//to compare client token and server token and match them if possible
import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  //lets get token from the head part of the index.html
  //token not stored in visible(body) of the website
  //stores in body tags which store metadata obviously

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);

    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    next("Auth failed");
  }
};

export default userAuth;
