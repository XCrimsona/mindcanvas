import { getDB } from "@/lib/connnections/Connections";
import Dates from "@/lib/DateTimeModules";
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

export async function GET(request: NextRequest, { params }: any): Promise<any> {
  try {
    await getDB();
    const { accountid }: any = await params;

    const user = await UserModel.findById(accountid);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    //workspace data
    const workspaces = await workspaceModel.find({ createdBy: user._id });
    // console.log(workspaces);

    const userInfo = {
      id: user._id,
      workspaces,
    };
    return new NextResponse(JSON.stringify({ data: userInfo }), {
      status: 200,
    });
  } catch (err: any) {
    console.warn("post error: ", err.stack);
  }
}

export async function POST(request: NextRequest): Promise<any> {
  try {
    await getDB();
    // const { accountid }: any = await params;
    const body = await request.json();

    const { sub, workspacename, workspacedescription } = body;
    // const Date = Dates;
    console.log(sub, workspacename, workspacedescription);

    //find and assign userId
    const user = await UserModel.findById(String(sub));
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    const date = Dates();
    console.log(date);
    console.log(user);

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
