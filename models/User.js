import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

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

export default mongoose.model("User", UserSchema);
