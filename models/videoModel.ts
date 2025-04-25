import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoUrl: {
      type: String,
      required: true,
    },
    videoFormat: {
      type: String,
      enum: ["mp4", "webm", "mov"],
      required: true,
    },
    thumbnail: {
      type: String,
      maxlength: [2048, "Thumbnail URL too long (max 2048 characters)"],
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

const videoModel =
  mongoose.models.videos || mongoose.model("videos", videoSchema);
export default videoModel;
