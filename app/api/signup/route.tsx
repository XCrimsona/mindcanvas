import { NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { PasswordService } from "@/lib/services/Hashing";
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
    const passwordService = new PasswordService();
    if (
      !firstname?.trim() ||
      !lastname?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Confirm password match
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    // Clean and safe input
    const hashedPassword = await passwordService.hashPassword(password);
    const data: any = {};
    if (firstname) data.firstname = firstname.trim();
    if (lastname) data.lastname = lastname.trim();
    if (gender) data.gender = gender.trim();
    if (dob) data.dob = dob.trim();
    if (email) data.email = email.trim();
    if (password) data.password = hashedPassword.trim();
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
