import { getDB } from "@/lib/connnections/Connections";
import UserModel from "@/models/userModel";
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
    const { accountid }: any = await params;

    const user = await UserModel.findById(accountid);
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    // console.log(user);
    return new NextResponse(JSON.stringify({ data: user }), { status: 200 });
  } catch (err: any) {
    console.warn("post error: ", err.message);
  }
}
