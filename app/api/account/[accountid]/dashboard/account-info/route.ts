import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { getDB } from "@/lib/connnections/Connections";
import bcrypt from "bcryptjs";
import { PasswordService } from "@/lib/services/Hashing";

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

  const user = await UserModel.findById(accountid);
  // console.log(user);

  if (!user) {
    return NextResponse.json({ error: "Failed to retrieve" }, { status: 404 });
  }
  return NextResponse.json({ data: user }, { status: 200 });
}

//finds and updates user data
export async function PUT(req: NextRequest, { params }: any): Promise<any> {
  await getDB();
  const { accountid } = await params;
  const body = await req.json();
  const { updateAccountData } = body;

  const {
    firstname,
    lastname,
    gender,
    dob,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
  } = updateAccountData;

  const user = await UserModel.findById(accountid);
  if (!user) {
    return NextResponse.json(
      { error: "Account ID not found." },
      { status: 404 }
    );
  } else {
    const newAccountInfo: any = {};
    if (firstname) newAccountInfo.firstname = firstname;
    if (lastname) newAccountInfo.lastname = lastname;
    if (gender) newAccountInfo.gender = gender;
    if (dob) newAccountInfo.dob = dob;
    if (email) newAccountInfo.email = email;
    if (currentPassword) newAccountInfo.currentPassword = currentPassword;
    if (newPassword) newAccountInfo.newPassword = newPassword;
    if (confirmNewPassword) newAccountInfo.email = email;
    const encryptNewPassword = new PasswordService();
    if (
      user &&
      (await encryptNewPassword.comparePasswords(
        currentPassword,
        user.password
      )) === false
    ) {
      return NextResponse.json(
        { error: "Current password incorrect" },
        { status: 403 }
      );
    } else {
      if (
        newAccountInfo.newPassword !== newAccountInfo.confirmNewPassword ||
        newAccountInfo.confirmNewPassword !== newAccountInfo.newPassword
      ) {
        return NextResponse.json(
          { error: "New passwords don't match" },
          { status: 400 }
        );
      } else {
        if (newPassword) {
          newAccountInfo.password = await bcrypt.hash(newPassword, 10);
          console.log("old password for account: ", user.password);
          console.log("new password for account: ", newAccountInfo.password);
        }
      }
      await UserModel.updateOne(
        { _id: user._id },
        {
          $set: newAccountInfo,
        },
        { new: true }
      );
      return NextResponse.json(
        { message: "Your account info has been updated." },
        { status: 200 }
      );
    }
  }
}
