import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Workspace name must be at least 3 characters"],
      maxlength: [100, "Workspace name too long"],
    },
    workspacename: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Workspace name must be at least 3 characters"],
      maxlength: [100, "Workspace name too long"],
    },
    description: {
      type: String,
      maxlength: [300, "Description is too long"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    dateCreated: {
      type: String,
      required: true,
    },
    // collaborators: [
    //   {
    //     type: mongoose.Types.ObjectId,
    //     ref: "users",
    //   },
    // ],
  },
  { timestamps: true }
);

const workspaceModel =
  mongoose.models.workspaces || mongoose.model("workspaces", workspaceSchema);
export default workspaceModel;

// OPTIONAL FEATURE for sharing workspaces
// isPublic: {
//     type: Boolean,
//     default: false
//   }
