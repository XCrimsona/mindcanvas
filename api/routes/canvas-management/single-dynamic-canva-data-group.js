import getDB from "../../../lib/connnections/Connections.js";
import audioModel from "../../../models/audioModel.js";
import imageModel from "../../../models/imageModel.js";
import textModel from "../../../models/textModel.js";
import UserModel from "../../../models/userModel.js";
import videoModel from "../../../models/videoModel.js";
import workspaceModel from "../../../models/workspaceModel.js";
import Router from "express";


//loads all canva data depending on id access
const singleDynamicCanvaDataGroupRouter = Router();
singleDynamicCanvaDataGroupRouter
    //below code runs when data inside a canva is made after its creation
    .get("/:userid/canvas-management/:canvaid", async (req, response) => {

        try {
            await getDB();
            const userid = req.params.userid;
            const canvaid = req.params.canvaid;
            // console.log(userid);

            const user = await UserModel.findOne({ _id: userid });
            // console.log(user);

            if (!user) {
                response.json({
                    success: false,
                    code: "MISSING_USER_DATA",
                    status: 404,
                    message: "User data not found",
                });
            } else {
                const workspace = await workspaceModel.findOne({
                    createdBy: user._id,
                    _id: canvaid,
                });
                // console.log("workspace: ", workspace);

                if (workspace) {
                    const [texts
                        // , audios, images, videos
                    ] = await Promise.all([
                        textModel.find({ workspaceId: workspace._id, createdBy: user._id }),
                        // audioModel.find({ workspaceId: workspace._id, createdBy: user._id }),
                        // imageModel.find({ workspaceId: workspace._id, createdBy: user._id }),
                        // videoModel.find({ workspaceId: workspace._id, createdBy: user._id }),
                    ]);

                    const workspaceData = {
                        texts,
                        // audios,
                        // images,
                        // videos,
                    };

                    const empty =
                        texts.length === 0;
                    // &&
                    // audios.length === 0 &&
                    // images.length === 0 &&
                    // videos.length === 0;

                    //update to canvaInfo
                    const workspaceNameData = {
                        workspaceName: workspace.name,
                        workspaceTextName: workspace.workspacename,
                        workspaceData
                    };
                    if (empty) {
                        response.json({
                            success: true,
                            status: 200,
                            code: "NO_EXISTING_DATA",
                            message:
                                "Your canva doesn't have data yet. Create some data using the Component Hub. ",
                            workspaceNameData
                        });
                    } else {
                        response.json({
                            success: true,
                            status: 200,
                            message: "Data retrieval complete.",
                            workspaceNameData,
                        });
                    }
                } else {
                    response.status(404).json({
                        success: false,
                        code: "WORKSPACE_DOES_NOT_EXIST",
                        status: 404,
                        message: "Workspace not found",
                    });
                }
            }
        } catch (err) {
            response.json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side workspace has issues",
            });
        }
    })
    .post("/:userid/canvas-management/:canvaid", async (req, response) => {
        // { params }
        try {
            await getDB();
            const userid = req.params.userid;
            const canvaid = req.params.canvaid;
            if (!userid || !canvaid) {
                response.json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                });
            } else {
                const user = await UserModel.findById(String(userid));
                if (!user) {
                    response.json({
                        success: false,
                        code: "USER_NOT_AUTHORIZED",
                        status: 401,
                        message: "User is not logged in",
                    });
                } else {
                    const workspace = await workspaceModel.findOne({
                        createdBy: user._id,
                        _id: canvaid,
                    });

                    if (workspace) {
                        const { text, type, x, y
                        } = req.body;
                        if (text && type && x >= 0 && y >= 0) {

                            const createTextComponent = await textModel.create({
                                text: text,
                                type: type,
                                position: { x: x, y: y },
                                owner: user._id,
                                createdBy: user._id,
                                workspaceId: canvaid,
                                //the url name of the canva workspace
                                name: workspace.name,
                                workspacename: workspace.workspacename,
                            });
                            // console.log("createTextComponent: ", createTextComponent);

                            if (!createTextComponent) {
                                response.json({
                                    success: true,
                                    code: "COMPONENT_CREATION_FAILED",
                                    status: 500,
                                    message: "Not Created",
                                });
                            } else {
                                response.json({
                                    success: true,
                                    code: "COMPONENT_CREATED",
                                    status: 201,
                                    message: "TextComponent created!",
                                });
                            }
                        } else {
                            response.json({
                                success: false,
                                code: "MISSING_ESSENTIAL_COMPONENT_DATA",
                                status: 400,
                                message: "Request requires more data!",
                            });
                        }
                    } else {
                        response.json({
                            success: false,
                            code: "REQUESTED_WORKSPACE_NOT_FOUND",
                            status: 404,
                            message: "Requested workspace not found!",
                        });
                    }
                }
            }
        } catch (err) {
            console.log("err: ", err.message);

            response.status(500).json({

                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side workspace has issues",
            });
        }
    })

    .patch("/:userid/canvas-management/:canvaid", async (req, res) => {
        try {
            await getDB();
            const userid = req.params.userid;
            const canvaid = req.params.canvaid;
            const { _id, type, updateType, text, x, y } = req.body;
            //text will be null for xy updates 
            //text will be present for text updates

            if (userid && canvaid) {
                const user = await UserModel.findById(String(userid));
                if (user) {
                    const workspace = await workspaceModel.findOne({
                        createdBy: user._id,
                        _id: canvaid,
                    });
                    // console.log("workspace: ", workspace);
                    if (workspace) {
                        // console.log("_id and type: ", _id, type, updateType);
                        if (!_id || !type || !updateType) {
                            res.status(400).json({
                                success: false,
                                code: "INSUFFICIENT_DATA",
                                status: 400,
                                message: "Insufficient data",
                            });
                        } else {
                            // console.log("type: ", type);

                            if (type === "Text") {
                                if (updateType === "Text") {

                                    const newData = {};
                                    if (text) newData.text = text;

                                    const reqToEditTextComponent = await textModel.updateOne(
                                        {
                                            _id,
                                            type,
                                            createdBy: user._id,
                                        },
                                        { $set: newData },
                                        { new: true }
                                    );

                                    if (reqToEditTextComponent) {
                                        res.status(200).json({
                                            success: true,
                                            code: "TEXT_UPDATE_REQUEST_COMPLETE",
                                            status: 200,
                                            message: "Requested text component has been updated",
                                        });

                                    } else {
                                        res.status(400).json({

                                            success: false,
                                            code: "TEXT_UPDATE_REQUESTED_FAILED",
                                            status: 404,
                                            message: "Requested text component data is not available",
                                        });
                                    }
                                }
                                if (updateType === "XY_POSITIONS") {
                                    const positions = {
                                        position: {
                                            x: x,
                                            y: y
                                        }
                                    };

                                    const reqToUpdateMediaFragmentXYCordinates = await textModel.updateOne(
                                        {
                                            _id: _id,
                                            createdBy: user._id,
                                        },
                                        { $set: positions },
                                        { new: true }
                                    );

                                    if (reqToUpdateMediaFragmentXYCordinates) {
                                        res.status(200).json({
                                            success: true,
                                            code: "MEDIA_XY_COORDINATES_REQUEST_UPDATED",
                                            status: 200,
                                            message: "Text XY coordinates have been updated",
                                        });

                                    } else {
                                        res.status(404).json({
                                            success: false,
                                            code: "TEXT_UPDATE_REQUESTED_FAILED",
                                            status: 404,
                                            message: "Requested text component data is not available",
                                        });
                                    }
                                }
                            }
                        }
                    } else {
                        res.status(404).json({
                            success: false,
                            code: "REQUESTED_WORKSPACE_NOT_FOUND",
                            status: 404,
                            message: "Requested canva not found",
                        });
                    }
                } else {
                    res.status(404).json({
                        success: false,
                        code: "USER_NOT_FOUND",
                        status: 404,
                        message: "User is not authorized",
                    });
                }

            } else {
                res.status(401).json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                });

            }
        } catch (err) {
            res.status(500).json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side workspace has issues",
            });
        }
    })

    .delete("/:userid/canvas-management/:canvaid", async (req, res) => {
        try {
            await getDB();
            const userid = req.params.userid;
            const canvaid = req.params.canvaid;
            const { type, _id } = req.body;

            if (userid && canvaid) {
                const user = await UserModel.findById(String(userid));
                if (!user) {
                    res.status(404).json({

                        success: false,
                        code: "USER_NOT_FOUND",
                        status: 404,
                        message: "User is not authorized",
                    });
                }

                const workspace = await workspaceModel.findOne({
                    createdBy: user._id,
                    _id: canvaid,
                });
                if (!workspace) {
                    res.status(404).json({
                        success: false,
                        code: "REQUESTED_WORKSPACE_NOT_FOUND",
                        status: 404,
                        message: "Requested workspace not found",
                    });
                }

                if (!type) {
                    return res.status(400).json({
                        success: false,
                        code: "INSUFFICIENT_DATA",
                        status: 400,
                        message: "Insufficient data",
                        status: 400,
                    });
                }

                if (type === "Text") {
                    if (!_id) {
                        res.status(400).json({
                            success: false,
                            code: "INSUFFICIENT_COMPONENT_DATA",
                            status: 400,
                            message: "Insufficient component data",
                        });
                    } else {
                        const reqToDeleteTextComponent = await textModel.deleteOne({
                            //component's id
                            _id,
                            createdBy: user._id,
                        });

                        if (!reqToDeleteTextComponent) {
                            res.status(404).json({
                                success: false,
                                code: "TEXT_UPDATE_REQUESTED_FAILED",
                                status: 404,
                                message: "Requested text component data not available",
                            });
                        } else {
                            res.status(200).json({

                                success: true,
                                code: "TEXT_UPDATE_REQUEST_COMPLETE",
                                status: 200,
                                message: "Requested text has been updated",
                            })
                        }
                    }
                }

                if (type === "Workspace") {
                    // console.log("_id: ", _id, " ", "id: ", id);

                    // console.log("workspace within type logic");

                    const reqToDeleteTextComponents =
                        await textModel.deleteMany({
                            //component's id
                            //user data
                            // owner: user._id,
                            workspaceId: workspace._id,
                            createdBy: user._id,
                        });

                    if (reqToDeleteTextComponents.acknowledged) {
                        const reqToDeleteTextComponent = await workspaceModel.deleteOne({
                            //component's id
                            _id: canvaid,
                            //user data
                            owner: user._id,
                            createdBy: user._id,
                        });
                        if (reqToDeleteTextComponent) {

                            res.status(200).json({
                                success: true,
                                code: "WORKSPACE_DELETED",
                                status: 200,
                                message: "Workspace has been deleted",
                            });
                        } else {
                            res.status(404).json({
                                success: false,
                                code: "WORKSPACE_DELETION_FAILED",
                                status: 404,
                                message: "Failed to delete the requested workspace",
                            });
                        }
                    } else {
                        res.status(404).json({
                            success: false,
                            code: "WORKSPACE_DATA_DELETION_FAILED",
                            status: 404,
                            message: "Failed to delete the requested workspace's data",
                        });
                    }
                }
            } else {
                res.status(401).json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                })
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side workspace has issues",
            })
        }
    });
export default singleDynamicCanvaDataGroupRouter;