import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { TokenService } from "@/lib/services/JwtTokenService";
import { getDB } from "@/lib/connnections/Connections";
import { PasswordService } from "@/lib/services/Hashing";
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

export async function POST(request: NextRequest) {
  try {
    await getDB();
    const body = await request.json();
    const { email, password } = body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Enter email doesn't exist!" },

        //conflict of attempting to make more than one identical email addressess
        { status: 404 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill required fields!" },
        { status: 400 }
      );
    }

    //sign user and redirect
    console.log("user data: ", user);

    const comparePassword = new PasswordService();
    if (
      user &&
      (await comparePassword.comparePasswords(password, user.password))
    ) {
      const loginData: any = {};
      if (email) loginData.email = email;
      if (password) loginData.password = password;

      // request.session.user = {};
      const authService = new AuthService();
      const formattedUserData = await authService.signin(loginData);
      if (!formattedUserData) {
        return new NextResponse(JSON.stringify({ error: "token not found" }), {
          status: 404,
        });
      }
      return new NextResponse(JSON.stringify(formattedUserData), {
        status: 200,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Incorrect credentials" }),
        {
          status: 403,
        }
      );
    }
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
}
