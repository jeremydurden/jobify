import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

//extending from Error class to add a cust statusCode property that can be used for a logic check in the errorHandlerMiddlerware function
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //manually throwing a custom Error if any of these values are missing from the req.body
    throw new CustomAPIError("please provide all values");
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send("login-user");
};
const updateUser = async (req, res) => {
  res.send("updateUser-user");
};
export { register, login, updateUser };
