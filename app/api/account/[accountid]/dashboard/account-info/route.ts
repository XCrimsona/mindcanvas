import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { getDB } from "@/lib/connnections/Connections";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "3600000",
    },
  });
}

//finds and returns info about a user
export async function GET(req: NextRequest, { params }: any) {
  await getDB();

  const { accountid } = await params;
  console.log("params: ", accountid, typeof accountid);

  const user = await UserModel.findById(accountid);

  if (!user) {
    return NextResponse.json({ error: "Failed to retrieve" }, { status: 404 });
  }
  return NextResponse.json({ message: user }, { status: 200 });
}

//finds and updates user data
export async function PUT(req: NextRequest) {
  await getDB();

  const body = await req.json();
  const { id, formdata } = body;
  console.log("user data for PUT: ", id, typeof id);
  console.log("user data for PUT: ", formdata, typeof formdata);
  if (!id) {
    return NextResponse.json({ error: "User id not found!" }, { status: 404 });
  }

  // if (formdata == null) {
  //   return NextResponse.json({ error: "fields are empty" }, { status: 400 });
  // }

  // return NextResponse.json({ message: "ok" }, { status: 200 });
  const founduser = await UserModel.findById(id);
  // console.log(founduser);
  if (!founduser) {
    return NextResponse.json(
      { error: "Failed to find your account info." },
      { status: 500 }
    );
  } else {
    const newData = UserModel.updateOne(
      { _id: id },
      { $set: formdata },
      { new: true }
    );
    // console.log(newData);

    return NextResponse.json(
      { message: "Your account info has been updated." },
      { status: 200 }
    );
  }
}
