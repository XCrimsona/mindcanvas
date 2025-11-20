import UserModel from "../../../models/userModel.js";
import getDB from "../../../lib/connnections/Connections.js";
import bcrypt from "bcryptjs";
import { PasswordService } from "../../../lib/Hashing.js";
import Router from "express";

const accountRouter = Router();

//finds and returns info about a user
accountRouter
  .get("/:userid/account-info", async (req, res) => {
    await getDB();

    const userid = req.params.userid;

    const user = await UserModel.findOne({ _id: userid });
    console.log("user: ", user);

    if (!user) {
      return res.status(404).json({ error: "Failed to retrieve", status: 404 });
    }
    return res.status(200).json({ data: user, status: 200 });
  })
  .put("/:userid/account-info", async (req, res) => {
    //finds and updates user data
    await getDB();
    const { accountid, updateAccountData } = await req.body;

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
      return res.status(404).json({ error: "Account ID not found.", status: 404 });
    } else {
      const newAccountInfo = {};
      if (firstname) newAccountInfo.firstname = firstname;
      if (lastname) newAccountInfo.lastname = lastname;
      if (gender) newAccountInfo.gender = gender;
      if (dob) newAccountInfo.dob = dob;
      if (email) newAccountInfo.email = email;
      if (currentPassword) newAccountInfo.currentPassword = currentPassword;
      if (newPassword) newAccountInfo.newPassword = newPassword;
      if (confirmNewPassword) newAccountInfo.email = email;

      //create a new hashed password
      const encryptNewPassword = new PasswordService();
      if (
        user &&
        (await encryptNewPassword.comparePasswords(
          currentPassword,
          user.password
        )) === false
      ) {
        return res.status(403).json({ error: "Current password incorrect", status: 403 });
      } else {
        if (
          newAccountInfo.newPassword !== newAccountInfo.confirmNewPassword ||
          newAccountInfo.confirmNewPassword !== newAccountInfo.newPassword
        ) {
          return res.status(400).json({ error: "New passwords don't match", status: 400 });
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
          }
          // { new: true }
        );
        return res.status(200).json({
          message: "Your account info has been updated.",
          status: 200,
        });
      }
    }
  });
// .delete

//delete functionality required

export default accountRouter;
