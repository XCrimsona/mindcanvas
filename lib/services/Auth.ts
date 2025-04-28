import { PasswordService } from "./Hashing";
import UserModel from "@/models/userModel";
import { TokenService } from "@/lib/services/JwtTokenService";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface IRegister {
  firstname: string;
  lastname: string;
  gender?: string | null;
  dob?: string | null;
  email: string;
  password: string;
}
interface ILogin {
  email: string;
  password: string;
}
export class AuthService {
  private tokenService: TokenService;
  private passwordService: PasswordService;
  constructor() {
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService();
  }

  signup = async (userInput: IRegister): Promise<void> => {
    const { firstname, lastname, gender, dob, email, password } = userInput;

    const data: any = {};
    if (firstname) data.firstname = firstname;
    if (lastname) data.lastname = lastname;
    if (gender) data.gender = gender;
    if (dob) data.dob = dob;
    if (email) data.email = email;
    if (password) data.password = password;
    console.log(data);

    if (!data) {
      throw new Error("Form data is required but missing");
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      throw new Error("That email already exists!");
    } else {
      if (!firstname || !password) {
        throw new Error("Passwords is missing!");
      }
      const hashpassword = await this.passwordService.hashPassword(password);
      const createdUser = await UserModel.create({
        firstname,
        lastname,
        gender,
        email,
        dob,
        password: hashpassword,
        role: "user",
      });
      return createdUser;
    }
  };

  signin = async (userInput: ILogin): Promise<string> => {
    const { email, password } = userInput;

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("That email does not exist!");

    console.log(typeof user.password);

    const loginData: any = {};

    if (email) loginData.email = email;
    if (password) loginData.password = password;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      // console.log("Not Authorized, Incorrect Credentials");
      throw new Error("Not Authorized, Incorrect Credentials");
    } else {
      const validDatedUser = {
        sub: user._id,
        role: user.role,
      };

      //   sub: existingUser._id.toString(),
      // const token = jwt.sign({}, process.env.JWT, {});
      // this.tokenService.sign({
      //   sub: existingUser._id.toString(),
      //   role: existingUser.role,
      // });

      const tknservice = new TokenService();
      return tknservice.sign(validDatedUser);
      // return user._id;
      // {
      //   token,
      //   _id: user._id,
      //   role: user.role,
      //   email: user.email,
      // };
    }
  };
}
