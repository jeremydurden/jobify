import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //manually throwing a custom Error if any of these values are missing from the req.body
    throw new BadRequestError("please provide all values");
  }
  //checking the user document to see if a user w/ this email already exists and then throwing a Bad request error if that is true
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
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
