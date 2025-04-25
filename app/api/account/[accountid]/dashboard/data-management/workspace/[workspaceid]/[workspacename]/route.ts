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
    } else {
      const sheetResponse = await fetch(
        `http://localhost:3000/api/account/${user._id}/dashboard/data-management/sheet/[sheetid]/[sheetname]/`
      );
      if (sheetResponse.ok) {
        const sheetdata = await sheetResponse.json();
        console.log("sheet Data: ", "Failed to retrive sheet data");
        return new NextResponse(JSON.stringify({ data: sheetdata }), {
          status: 200,
        });
      } else {
        console.log("Failed to retrive sheet data");
        return new NextResponse(
          JSON.stringify({ error: "Failed to retrieve sheet data" }),
          { status: 404 }
        );
      }
    }
    //main return
  } catch (err: any) {
    console.warn("post error: ", err.message);
  }
}
