import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please use Alphanumeric characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please use Alphanumeric characters"],
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
    minLength: 1,
    maxLength: 10,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please use a valid email address"],
  },
  password: {
    type: String,
    minLength: 16,
    maxLength: 140,
    required: [
      true,
      "Use special, and alphanumeric characters for a strong password.",
    ],
  },
  confirmpassword: {
    type: String,
    minLength: 16,
    maxLength: 140,
    required: [true, "Retype the same password to ensure its correct."],
    select: false,
  },
  role: "base-access",
});

const UserModel =
  mongoose.models.UserModel || mongoose.model("UserModel", userschema);
export default UserModel;
