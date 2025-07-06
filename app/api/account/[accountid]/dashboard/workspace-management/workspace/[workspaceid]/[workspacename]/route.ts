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
          code: "MISSING_ROUTE_DATA",
          status: 404,
          message: "User id, workspacename or workspaceid is missing",
        }),
        { status: 404 }
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
    console.log(text, type, x, y);

    const { accountid, workspacename, workspaceid }: any = await params;
    if (!accountid || !workspacename || !workspaceid) {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/auth/signin`, request.url)
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
            await textModel.create({
              text: text,
              type: type,
              owner: user._id,
              position: { x: x, y: y },
              createdBy: user._id,
              workspaceId: workspaceid,
            });

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
    if (!accountid || !workspacename || !workspaceid) {
      return NextResponse.redirect(
        new URL(`http://localhost:3000/auth/signin`, request.url)
      );
    }
    const user = await UserModel.findById(accountid);
    if (!user) {
      NextResponse.redirect(
        new URL(`http://localhost:3000/auth/signin`, request.url)
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
        const workspaceDeletion = await workspaceModel.deleteOne({
          _id: workspaceid,
          createdBy: user._id,
        });
        if (workspaceDeletion.deletedCount === 0) {
          return new NextResponse(
            JSON.stringify({
              success: false,
              code: "REQUESTED_WORKSPACE_NOT_FOUND",
              status: 404,
              message: "Requested workspace not found",
            }),
            { status: 404 }
          );
        } else {
          return new NextResponse(
            JSON.stringify({
              success: true,
              code: "REQUESTED_WORKSPACE_DELETED",
              status: 200,
              message: "Requested workspace deleted",
            }),
            { status: 200 }
          );
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
