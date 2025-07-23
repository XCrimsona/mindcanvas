import { getDB } from "@/lib/connnections/Connections";
import audioModel from "@/models/audioModel";
import imageModel from "@/models/imageModel";
import textModel from "@/models/textModel";
import UserModel from "@/models/userModel";
import videoModel from "@/models/videoModel";
import workspaceModel from "@/models/workspaceModel";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "3600000",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

export async function GET(request: NextRequest, { params }: any) {
  try {
    await getDB();
    const { accountid, workspacename, workspaceid }: any = await params;
    if (!accountid || !workspacename || !workspaceid) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          code: "NOT_AUTHORIZED",
          status: 401,
          message: "User not logged in",
        }),
        { status: 401 }
      );
    } else {
      const user = await UserModel.findById(accountid);
      if (!user) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            code: "MISSING_USER_DATA",
            status: 404,
            message: "User data not found",
          }),
          {
            status: 404,
          }
        );
      } else {
        const workspace = await workspaceModel.findOne({
          createdBy: user._id,
          _id: workspaceid,
        });
        if (!workspace) {
          return NextResponse.redirect(
            new URL(
              `http://localhost:3000/api/account/${accountid}/dashboard/workspace-management`,
              request.url
            )
          );
        } else {
          const [texts, audios, images, videos] = await Promise.all([
            textModel.find({ workspaceId: workspaceid, createdBy: user._id }),
            audioModel.find({ workspaceId: workspaceid, createdBy: user._id }),
            imageModel.find({ workspaceId: workspaceid, createdBy: user._id }),
            videoModel.find({ workspaceId: workspaceid, createdBy: user._id }),
          ]);

          const workspaceData: any = {
            texts,
            audios,
            images,
            videos,
          };

          const empty =
            texts.length === 0 &&
            audios.length === 0 &&
            images.length === 0 &&
            videos.length === 0;

          if (empty) {
            return new NextResponse(
              JSON.stringify({
                success: true,
                code: "NO_EXISTING_DATA",
                message:
                  "Your workspace doesn't have data yet. Create data using the Component Hub. ",
              }),
              { status: 200 }
            );
          } else {
            return new NextResponse(
              JSON.stringify({
                success: true,
                status: 200,
                message: "Data retrieval complete.",
                workspaceData,
              }),
              {
                status: 200,
              }
            );
          }
        }
      }
    }
    //main return
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: any) {
  try {
    await getDB();
    const body = await request.json();
    const { text, type, x, y } = body;

    const { accountid, workspacename, workspaceid }: any = await params;
    if (!accountid || !workspacename || !workspaceid) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          code: "NOT_AUTHORIZED",
          status: 401,
          message: "User not logged in",
        }),
        { status: 401 }
      );
    } else {
      const user = await UserModel.findById(accountid);
      if (!user) {
        return NextResponse.redirect(
          new URL(`http://localhost:3000/auth/signin/`, request.url)
        );
      } else {
        const workspace = await workspaceModel.findOne({
          createdBy: user._id,
          _id: workspaceid,
        });

        if (!workspace) {
          return new NextResponse(
            JSON.stringify({
              success: false,
              code: "REQUESTED_WORKSPACE_NOT_FOUND",
              status: 404,
              message: "Requested workspace not found!",
            }),
            {
              status: 404,
            }
          );
        } else {
          if (!text || !type || x < 0 || y < 0) {
            return new NextResponse(
              JSON.stringify({
                success: false,
                code: "MISSING_ESSENTIAL_COMPONENT_DATA",
                status: 400,
                message: "Request requires more data!",
              }),
              {
                status: 400,
              }
            );
          } else {
            //check point
            const createChecker = await textModel.create({
              text: text,
              type: type,
              position: { x: x, y: y },
              owner: user._id,
              createdBy: user._id,
              workspaceId: workspaceid,
              //the url name of the canva workspace
              name: workspacename,
              workspacename: workspacename,
            });

            if (!createChecker) {
              return new NextResponse(
                JSON.stringify({
                  success: true,
                  code: "COMPONENT_CREATION_FAILED",
                  status: 500,
                  message: "Not Created",
                }),
                { status: 500 }
              );
            } else {
              return new NextResponse(
                JSON.stringify({
                  success: true,
                  code: "COMPONENT_CREATED",
                  status: 201,
                  message: "Created",
                }),
                { status: 201 }
              );
            }
          }
        }
      }
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: any) {
  try {
    await getDB();
    const { accountid, workspacename, workspaceid }: any = await params;
    if (!accountid || !workspaceid || !workspacename) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          code: "NOT_AUTHORIZED",
          status: 401,
          message: "User not logged in",
        }),
        { status: 401 }
      );
    }
    const body = await request.json();
    const { owner, _id, type } = body;
    if (!owner || !_id || !type) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          code: "INSUFFICIENT_DATA",
          status: 400,
          message: "Insufficient data",
        }),
        {
          status: 400,
        }
      );
    } else {
      const user = await UserModel.findById(accountid);
      if (!user) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            code: "USER_NOT_FOUND",
            status: 404,
            message: "User is not authorized",
          }),
          {
            status: 404,
          }
        );
      } else {
        const workspace = await workspaceModel.findOne({
          createdBy: user._id,
          _id: workspaceid,
        });
        if (!workspace) {
          return new NextResponse(
            JSON.stringify({
              success: false,
              code: "REQUESTED_WORKSPACE_NOT_FOUND",
              status: 404,
              message: "Requested workspace not found",
            }),
            {
              status: 404,
            }
          );
        } else {
          const updatedComponent: any = {};

          if (workspaceid) updatedComponent.workspaceid = workspaceid;
          if (owner) updatedComponent.owner = owner;
          if (_id) updatedComponent._id = _id;
          if (type) updatedComponent.type = type;
          if (type === "Text") {
            const editedData = await UserModel.updateOne(
              { _id: user._id },
              {
                $set: updatedComponent,
              },
              { new: true }
            );

            if (!editedData.acknowledged) {
              return new NextResponse(
                JSON.stringify({
                  success: false,
                  code: "TEXT_UPDATE_REQUESTED_FAILED",
                  status: 404,
                  message: "Requested text component data not available",
                }),
                { status: 404 }
              );
            } else {
              new NextResponse(
                JSON.stringify({
                  success: true,
                  code: "TEXT_UPDATE_REQUEST_COMPLETE",
                  status: 404,
                  message: "Requested text has been updated",
                }),
                { status: 404 }
              );
            }
          }
        }
      }

      // if(type ==="")
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: any) {
  try {
    await getDB();
    const { accountid, workspacename, workspaceid }: any = await params;
    if (!accountid || !workspaceid || !workspacename) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          code: "NOT_AUTHORIZED",
          status: 401,
          message: "User not logged in",
        }),
        { status: 401 }
      );
    } else {
      const user = await UserModel.findById(accountid);
      if (!user) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            code: "USER_NOT_FOUND",
            status: 404,
            message: "User is not authorized",
          }),
          {
            status: 404,
          }
        );
      }
      console.log("user check: ", user);

      const workspace = await workspaceModel.findOne({
        createdBy: user._id,
        _id: workspaceid,
      });
      if (!workspace) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            code: "REQUESTED_WORKSPACE_NOT_FOUND",
            status: 404,
            message: "Requested workspace not found",
          }),
          {
            status: 404,
          }
        );
      }
      console.log(workspace);

      const body = await request.json();
      const { type } = body;
      console.log("type: ", type);

      if (!type) {
        return new NextResponse(
          JSON.stringify({
            success: false,
            code: "INSUFFICIENT_DATA",
            status: 400,
            message: "Insufficient data",
          }),
          {
            status: 400,
          }
        );
      }

      if (type === "Text") {
        const { _id } = body;
        // console.log("owner: ", owner, " ", "_id: ", _id);

        if (!_id) {
          return new NextResponse(
            JSON.stringify({
              success: false,
              code: "INSUFFICIENT_COMPONENT_DATA",
              status: 400,
              message: "Insufficient component data",
            }),
            {
              status: 400,
            }
          );
        } else {
          // const updatedComponent: any = {};
          // if (workspaceid) updatedComponent.workspaceid = workspaceid;
          // if (owner) updatedComponent.owner = owner;
          // if (_id) updatedComponent._id = _id;
          // if (type) updatedComponent.type = type;
          const reqToDeleteTextComponent = await textModel.deleteOne({
            //component's id
            _id,
            //user data
            // owner: user._id,
            createdBy: user._id,
          });

          if (!reqToDeleteTextComponent) {
            return new NextResponse(
              JSON.stringify({
                success: false,
                code: "TEXT_UPDATE_REQUESTED_FAILED",
                status: 404,
                message: "Requested text component data not available",
              }),
              { status: 404 }
            );
          } else {
            return new NextResponse(
              JSON.stringify({
                success: true,
                code: "TEXT_UPDATE_REQUEST_COMPLETE",
                status: 200,
                message: "Requested text has been updated",
              }),
              { status: 200 }
            );
          }
        }
      }

      if (type === "Workspace") {
        console.log("workspace within type logic");

        const reqToDeleteTextComponents = await textModel.deleteMany({
          //component's id
          //user data
          // owner: user._id,
          workspaceId: workspace._id,
          createdBy: user._id,
        });

        if (!reqToDeleteTextComponents) {
          return new NextResponse(
            JSON.stringify({
              success: false,
              code: "WORKSPACE_DATA_DELETION_FAILED",
              status: 404,
              message: "Failed to delete the requested workspace data",
            }),
            { status: 404 }
          );
        } else {
          const reqToDeleteTextComponent = await workspaceModel.deleteOne({
            //component's id
            _id: workspaceid,
            //user data
            owner: user._id,
            createdBy: user._id,
          });
          if (!reqToDeleteTextComponent) {
            return new NextResponse(
              JSON.stringify({
                success: false,
                code: "WORKSPACE_DELETION_FAILED",
                status: 404,
                message: "Failed to delete the requested workspace",
              }),
              { status: 404 }
            );
          } else
            return new NextResponse(
              JSON.stringify({
                success: true,
                code: "WORKSPACE_DELETED",
                status: 200,
                message: "Workspace has been deleted",
              }),
              { status: 200 }
            );
        }
      }
      return new NextResponse(
        JSON.stringify({
          success: true,
          code: "NO_OPERATION_PERFORMED",
          status: 200,
          message: "Nothing is deleted but the api is ok",
        }),
        { status: 200 }
      );
    }
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        code: "SERVER_WORKSPACE_ERROR",
        status: 500,
        message: "The server side workspace has issues",
      }),
      { status: 500 }
    );
  }
}
