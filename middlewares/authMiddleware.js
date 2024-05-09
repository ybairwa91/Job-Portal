//to compare client token and server token and match them if possible
import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization.token;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next("Auth Failed");
  }
};
