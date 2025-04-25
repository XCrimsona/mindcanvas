import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { TokenService } from "@/lib/services/JwtTokenService";
import { getDB } from "@/lib/connnections/Connections";
import { PasswordService } from "@/lib/services/Hashing";
import { AuthService } from "@/lib/services/Auth";
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

        //conflict of attempting to make more than one identical email addressess
        { status: 404 }
      );
    }

    //sign user and redirect
    const comparePassword = new PasswordService();

    // if (
    //   (await comparePassword.comparePasswords(password, user.password)) ===
    //   false
    // ) {
    //   return NextResponse.json(
    //     { error: "Incorrect credentials" },
    //     { status: 403 }
    //   );
    // }
    console.log("user data: ", user);

    if (
      user &&
      (await comparePassword.comparePasswords(password, user.password))
    ) {
      // request.session.user = {};
      const authService = new AuthService();
      const formattedUserData = await authService.signin(user.email, password);
      if (!formattedUserData) {
        return new NextResponse(JSON.stringify({ error: "token not found" }), {
          status: 404,
        });
      } else {
        return new NextResponse(JSON.stringify({ formattedUserData }), {
          status: 200,
        });
      }
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
