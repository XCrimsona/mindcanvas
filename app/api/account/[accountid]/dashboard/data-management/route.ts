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
    return new NextResponse(JSON.stringify({ data: workspaces }), {
      status: 200,
    });
  } catch (err: any) {
    console.warn("post error: ", err.message);
  }
}

export async function POST(request: NextRequest, { params }: any) {
  try {
    const body = await request.json();

    const { workspacename, workspacedescription } = body;
    // const Date = Dates;

    //find and assign userId
    const { accountid }: any = await params;
    const user = await UserModel.findById(accountid);
    const date = Dates();
    console.log(date);

    const workspaceData: any = {};
    if (workspacename) workspaceData.workspacename = workspacename;
    if (workspacedescription)
      workspaceData.workspacedescription = workspacedescription;

    if (workspacename && workspacedescription) {
      const newWorkspace = await workspaceModel.create({
        name: workspacename.toLowerCase(),
        //above for urls
        workspacename: workspacename,
        description: workspacedescription,
        createdBy: user._id,
        dateCreated: date,
      });
      console.log(newWorkspace);

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
