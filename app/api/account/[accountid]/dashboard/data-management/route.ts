import { getDB } from "@/lib/connnections/Connections";
import Dates from "@/lib/DateTimeModules";
import UserModel from "@/models/userModel";
import workspaceModel from "@/models/workspaceModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
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

export async function GET(request: NextRequest, { params }: any): Promise<any> {
  try {
    await getDB();
    const { accountid }: any = await params;

    const user = await UserModel.findById(accountid);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    } else {
      const [workspaces] = await Promise.all([
        await workspaceModel.find({ createdBy: user._id }),
      ]);

      if (workspaces.length === 0) {
        return new NextResponse(
          JSON.stringify({
            error:
              "Create a workspace so it can appear here retrieve workspace data",
          }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify({ data: workspaces }), {
        status: 200,
      });
    }
  } catch (err: any) {
    console.warn("post error: ", err.stack);
  }
}

export async function POST(request: NextRequest): Promise<any> {
  try {
    await getDB();
    const body = await request.json();
    const { sub, workspacename, workspacedescription } = body;

    const user = await UserModel.findById(String(sub));
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    //to track user signup and dates if needed later on
    const date = Dates();
    const workspaceData: any = {};
    if (workspacename) workspaceData.workspacename = workspacename;
    if (workspacedescription)
      workspaceData.workspacedescription = workspacedescription;

    if (workspacename && workspacedescription) {
      // const newWorkspace =
      const refactorWorkspaceName = workspacename
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      await workspaceModel.create({
        name: refactorWorkspaceName,
        //above for urls
        workspacename: workspacename,
        description: workspacedescription,
        createdBy: user._id,
        dateCreated: date,
      });
      // console.log(newWorkspace);

      return NextResponse.json({ message: "ok" }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Fill in required fields" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: any
): Promise<any> {
  try {
    await getDB();
    const { accountid }: any = await params;
    const body = await request.json();

    const { sub, workspacename, workspacedescription } = body;
    // const Date = Dates;
    console.log(
      "sub type: ",
      typeof sub,
      " sub = workspaceid: ",
      sub,
      workspacename,
      workspacedescription
    );

    //find and assign userId
    // const userId = accountid.toString();
    const user = await UserModel.findById(accountid);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    console.log("user: ", user);

    const workspace = await workspaceModel.findOne({
      _id: sub,
      createdBy: user._id,
    });
    console.log("workspace: ", workspace);

    if (!workspace) {
      return new NextResponse(
        JSON.stringify({ error: "Specified workspace not found" }),
        {
          status: 404,
        }
      );
    }

    const updatedPayload: any = {};
    if (workspacename) {
      updatedPayload.workspacename = workspacename;

      //workspacename with dashes for routing
      const refactorWorkspaceName = workspacename
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      updatedPayload.name = refactorWorkspaceName;
    }
    if (workspacedescription) updatedPayload.description = workspacedescription;

    const updatedWorkspace = await workspaceModel.updateOne(
      { _id: workspace._id },
      {
        $set: updatedPayload,
      }
    );
    console.log(updatedWorkspace);
    if (updatedWorkspace.modifiedCount > 0) {
      return NextResponse.json({ message: "ok" }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "Fill in required fields" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.warn("Error: ", err.message);
  }
}
