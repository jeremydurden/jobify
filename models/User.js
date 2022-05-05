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
    //causes the password to not be included when using the findOne method to query for User object
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
  //this first line checks to see if the password property on the user has been modified -- if it hasn't then it just returns -- isModified is a mongoose function
  //this allows us to modify other property of the user object and then .save(), triggering the .pre hook, but not leading to an
  //error when the passord is not included, or potentially hashed again after already being hashed.
  if (!this.isModified("password")) return;
  //if the password property was modified (or created) then it will hash it
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

//Custom instance method on the Model — has access to the document w/ 'this' keyword
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

//uses a method on bcrypt to hash and then compare the password of the user attempting to log in w/ the hashed password on the User
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
