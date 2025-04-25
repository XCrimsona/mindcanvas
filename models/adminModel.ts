import mongoose from "mongoose";

const adminschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: [50, "Email too long (max 50 characters)"],
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
      maxlength: [12, "Dob too long"],
    },
    email: {
      type: String,
      unique: true,
      maxlength: [50, "Email too long (max 50 characters)"],
      required: [true, "Please use a valid email address"],
    },
    password: {
      type: String,
      minlength: 16,
      maxlength: 140,
      required: [
        true,
        "Use special, and alphanumeric characters for a strong password.",
      ],
    },
    role: "full-access",
  },
  { timestamps: true }
);

const AdminModel =
  mongoose.models.admins || mongoose.model("admins", adminschema);
export default AdminModel;
