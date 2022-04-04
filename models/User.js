import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

// mongoose 'pre' save hook — gets called before creating/saving a User which allows us to hash the password before sending it to the database
UserSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

//Custom instance method on the Model — has access to the document w/ 'this' keyword
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
