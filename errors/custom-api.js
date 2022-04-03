//extending from Error class to be able to add a cust statusCode property that can be used for a logic check in the errorHandlerMiddlerware function

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
