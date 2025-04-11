import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import axios from "axios";
import mongoose from "mongoose";
import UserModel from "@/models/userModel";
export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const existingEmail = await UserModel.findOne({ email });
  if (existingEmail) {
    return NextResponse.json(
      { error: "A user with this email already exists!" },

      //conflict of attempting to make more than one identical email addressess
      { status: 409 }
    );
  }
}
