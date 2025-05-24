import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { AuthService } from "@/lib/services/Auth";
import { getDB } from "@/lib/connnections/Connections";

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

export async function POST(request: Request) {
  try {
    await getDB();
    const body = await request.json();
    const { firstname, lastname, gender, dob, email, password } = body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return new NextResponse(
        JSON.stringify({ error: "Email already exists! Choose another" }),

        //conflict of attempting to make more than one identical email addressess
        { status: 409 }
      );
    }

    //access password service and create new password if user doesnt yet exist
    if (!firstname && !lastname && !email && !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Confirm password match
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    const data: any = {};
    if (firstname) data.firstname = firstname;
    if (lastname) data.lastname = lastname;
    if (gender) data.gender = gender;
    if (dob) data.dob = dob;
    if (email) data.email = email;
    if (password) {
      data.password = password;
    }

    const authService = new AuthService();
    const formattedUserData = await authService.signup(data);
    return new NextResponse(JSON.stringify(formattedUserData), { status: 201 });

    //sign user and redirect
  } catch (err: any) {
    console.error("Signup Error:", err);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
