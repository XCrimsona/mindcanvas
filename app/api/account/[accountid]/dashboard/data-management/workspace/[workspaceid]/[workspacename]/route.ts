import { getDB } from "@/lib/connnections/Connections";
import textModel from "@/models/textModel";
import UserModel from "@/models/userModel";
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
          error: "userid, workspacename or workspaceid is missing",
        }),
        { status: 404 }
      );
    }
    const user = await UserModel.findById(accountid);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const workspace = await workspaceModel.findOne({
      createdBy: user._id,
      _id: workspaceid,
    });
    if (!workspace) {
      return new NextResponse(
        JSON.stringify({ error: "Workspace not found" }),
        {
          status: 404,
        }
      );
    } else {
      const [texts] = await Promise.all([
        textModel.find({ workspaceId: workspaceid, createdBy: user._id }),
      ]);
      if (texts.length === 0) {
        return new NextResponse(
          JSON.stringify({
            error:
              "Create your own data so it can appear here retrieve workspaceData",
          }),
          { status: 404 }
        );
      } else {
        console.log("Success retrieving workspaceData");
        return new NextResponse(JSON.stringify({ data: texts }), {
          status: 200,
        });
      }
    }
    //main return
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ error: "server internal workspace error" }),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: any) {
  try {
    await getDB();
    const body = await request.json();
    const { text, x, y, type } = body;
    console.log(body);

    const { accountid, workspacename, workspaceid }: any = await params;
    if (!accountid || !workspacename || !workspaceid) {
      return new NextResponse(
        JSON.stringify({
          error: "userid, workspacename or workspaceid is missing",
        }),
        { status: 404 }
      );
    }
    const user = await UserModel.findById(accountid);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const workspace = await workspaceModel.findOne({
      createdBy: user._id,
      _id: workspaceid,
    });
    if (!workspace) {
      return new NextResponse(
        JSON.stringify({ error: "Workspace not found" }),
        {
          status: 404,
        }
      );
    }
    if (!text || !x || !y || !type) {
      return new NextResponse(
        JSON.stringify({ error: "Input client data not found" }),
        {
          status: 404,
        }
      );
    }
    await textModel.create({
      text: text,
      type: type,
      position: { x: x, y: y },
      createdBy: user._id,
      workspaceId: workspaceid,
    });

    return new NextResponse(
      JSON.stringify({
        message: "Created",
      }),
      { status: 201 }
    );
  } catch (err: any) {
    return new NextResponse(
      JSON.stringify({ error: "server internal workspace error" }),
      { status: 500 }
    );
  }
}
