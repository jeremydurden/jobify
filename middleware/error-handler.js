import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    //checking for value from the custom Error used in the controller or using the http-status-codes package
    StatusCodes: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong—try again later.",
  };
  if (err.name === "ValidationError") {
    defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    // returns an array from Object.values(err.errors) and then maps over the array of the object's values to join any missing-input, message strings
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  // res.status(defaultError.StatusCodes).json({ msg: err });
  res.status(defaultError.StatusCodes).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
