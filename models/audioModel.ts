import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    audioUrl: {
      type: String,
      required: true,
    },
    audioFormat: {
      type: String,
      enum: ["mp3", "wav", "ogg"],
      default: "mp3",
    },
    transcription: {
      type: String,
      maxlength: [20000, "Audio transcription  too long (20 K characters)"],
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

const audioModel =
  mongoose.models.audios || mongoose.model("audios", audioSchema);
export default audioModel;
