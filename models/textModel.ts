import mongoose from "mongoose";

const textSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      enum: ["paragraph", "list"],
      default: "paragraph",
      minlength: [1, "Text content cannot be empty"],
      maxlength: [10000, "Text content too long (max 10 K characters)"],
      required: true,
    },
    postition: {
      x: {
        type: String,
        required: [true, "X coordinate is required"],
        min: 0,
      },
      y: {
        type: String,
        required: [true, "Y coordinate is required"],
        min: 0,
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    workspaceId: {
      type: mongoose.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
  },
  { timestamps: true }
);

const textModel = mongoose.models.texts || mongoose.model("texts", textSchema);
export default textModel;
