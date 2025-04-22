import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import UserModel from "@/models/userModel";
import { TokenService } from "@/lib/services/JwtTokenService";
import { getDB } from "@/lib/connnections/Connections";

export async function POST(request: Request) {
  try {
    await getDB();
    const body = await request.json();
    const { email, password } = body;

    if (!email && !password) {
      return NextResponse.json(
        { error: "Please fill required fields!" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Enter email doesn't exist!" },

        //conflict of attempting to make more than one identical email addressess
        { status: 404 }
      );
    }

    //sign user and redirect
    const validUserPassword = await bcrypt.compare(password, user.password);
    if (!validUserPassword) {
      return NextResponse.json(
        { error: "Incorrect credentials" },
        { status: 403 }
      );
    }

    //access and sign a new instance token to fully verify the user and respond with authenticated using a signed token
    const signUser = new TokenService();
    const token = signUser.sign({
      sub: user._id.toString(),
      role: user.role,
    });

    // request.session.user = {};
    return NextResponse.json({ token }, { status: 200 });
  } catch (err: any) {
    console.warn("Something went wrong: ", err.message);
  }
}
