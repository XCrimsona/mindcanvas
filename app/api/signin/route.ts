import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { getDB } from "@/lib/connnections/Connections";
import { AuthService } from "@/lib/services/Auth";

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

export async function GET(request: NextRequest) {
  try {
    await getDB();
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected connection error" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    await getDB();
    const body = await request.json();
    const { email, password } = body;
    const user = await UserModel.findOne({ email });

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill required fields!" },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Enter email doesn't exist!" },
        { status: 404 }
      );
    }
    //sign user and redirect
    console.log("user data: ", user);

    const loginData: any = { email, password };
    const authservice = new AuthService();
    const authResponse = await authservice.signin(loginData);
    console.log("auth response: ", authResponse);

    const returnData = {
      _id: user._id,
      data: authResponse,
    };
    console.log("return data: ", returnData.data);

    return NextResponse.json({ data: returnData }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
