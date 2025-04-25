import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "https urls only"],
    },
    publicId: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      enum: ["jpeg", "png", "gif", "svg", "webp", "jpg"],
      required: [true, 'Formats: "jpeg", "png", "gif", "svg", "webp", "jpg"'],
    },
    caption: {
      type: String,
      maxlength: [500, "Image caption too long (max 500 characters)"],
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

const imageModel =
  mongoose.models.images || mongoose.model("images", imageSchema);
export default imageModel;
