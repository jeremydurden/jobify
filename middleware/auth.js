import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // setting to the authorization property on the Headers object
  const authHeader = req.headers.authorization;
  //checking ot make sure the authorization property exists and that it begins with the "Bearer" for jwt
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    //error 401
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  // splitting off the Bearer string at the beginning to have access to only the token
  const token = authHeader.split(" ")[1];

  try {
    //verifying the token against our secret -- verifty is a function from the jwt library
    // returns object with userId, iat = time in milliseconds and when it expires
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach to the user request object
    req.user = { userId: payload.userId };
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalide");
  }
  next();
};

export default auth;
