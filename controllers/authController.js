import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //manually throwing a custom Error if any of these values are missing from the req.body
    throw new BadRequestError("Please provide all values");
  }
  //checking the user document to see if a user w/ this email already exists and then throwing a Bad request error if that is true
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use");
  }
  const user = await User.create({ name, email, password });
  // uses the jsonwebtoken package that was imported into the User model to create a web token assigned to the user based on their _id
  // and then adds the token to the res.status object response to communicate between the server and clientu
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
    location: user.location,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // .select('+password') overrides the "select: false" property on the password object on the UserSchema.  select: false was necessary becuase w/ User.create on the login function
  // we were getting the password when we didn't need it, so "select: false" means that it won't be returned w/ queries
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  // this way the password doesn't get sent back to the client  in the response along with the token and other data, but we don't need to hard-code the user data manually
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  // destructure the properties from req.body
  const { email, name, lastName, location } = req.body;
  //check to make sure that all properties exist on the body and if not throw new error
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }
  //find the user who's id matches the id on req.user, which is being set on the auth.js middleware
  const user = await User.findOne({ _id: req.user.userId });
  //now update the values on the user object w/ the matching values from the request body
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;
  //calling user.save will trigger the .pre function on UserSchema in the User.js model.
  await user.save();
  const token = user.createJWT();
  //sends back the user object with updated values minus the password -- the current setup needs to change, because that function is looking for a password on the user
  //object in order to hash it w/ bcrypt
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};
export { register, login, updateUser };
