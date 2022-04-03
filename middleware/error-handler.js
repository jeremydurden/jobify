import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    StatusCodes: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: "Something went wrong—try again later.",
  };
  if (err.name === "ValidationError") {
    defaultError.StatusCodes = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  // res.status(defaultError.StatusCodes).json({ msg: err });
  res.status(defaultError.StatusCodes).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
