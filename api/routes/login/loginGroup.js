const UserModel = require("../models/userModel");
const { getDB } = require("../lib/connnections/Connections");
const { AuthService } = require("../lib/services/Auth");
const { Router, Request, Response
} = require("express")
const express = require("express");
const app = express();
const { router } = Router();

router.get("/", async () => {

  try {
    await getDB();
    return res.json({ status: 200 });
  } catch (err) {
    return res.json(
      { error: err.message || "Unexpected connection error" },
      { status: 500 }
    );
  }
})
  .post("/", async () => {
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

      const loginData = { email, password };
      const authservice = new AuthService();
      const authResponse = await authservice.signin(loginData);
      console.log("auth response: ", authResponse);

      const returnData = {
        _id: user._id,
        data: authResponse,
      };
      console.log("return data: ", returnData.data);

      return NextResponse.json({ data: returnData }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { error: err.message || "Unexpected server error" },
        { status: 500 }
      );
    }
  })
