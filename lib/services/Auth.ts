// import { PasswordService } from "./Hashing";
// import UserModel from "../models/userModel";
// import { TokenService } from "../lib/services/JwtTokenService";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import session from "express-session";

// interface IRegister {
//   firstname: string;
//   lastname: string;
//   gender?: string | null;
//   dob?: string | null;
//   email: string;
//   password: string;
// }
// interface ILogin {
//   email: string;
//   password: string;
// }
// export class AuthService {
//   private passwordService: PasswordService;
//   constructor() {
//     this.passwordService = new PasswordService();
//   }

//   signup = async (userInput: IRegister): Promise<void> => {
//     const { firstname, lastname, gender, dob, email, password } = userInput;

//     const data: any = {};
//     if (firstname) data.firstname = firstname;
//     if (lastname) data.lastname = lastname;
//     if (gender) data.gender = gender;
//     if (dob) data.dob = dob;
//     if (email) data.email = email;
//     if (password) data.password = password;
//     console.log(data);

//     if (!data) {
//       throw new Error("Form data is required but missing");
//     } else if (!data.password) {
//       throw new Error("Passwords is missing!");
//     }
//     const user = await UserModel.findOne({ email });

//     if (user) {
//       throw new Error("That email already exists!");
//     } else {
//       const hashpassword = await this.passwordService.hashPassword(password);
//       const createdUser = await UserModel.create({
//         firstname,
//         lastname,
//         gender,
//         email,
//         dob,
//         password: hashpassword,
//         role: "user",
//       });
//       return createdUser;
//     }
//   };

//   signin = async (userInput: ILogin): Promise<string> => {
//     const { email, password } = userInput;
//     const user = await UserModel.findOne({ email });

//     if (!user) throw new Error("That email does not exist!");
//     const isValid = await this.passwordService.comparePasswords(
//       password,
//       user.password
//     );

//     if (!isValid) {
//       throw new Error("Incorrect Credentials");
//     } else {
//       const validDatedUser = {
//         sub: user._id,
//         role: user.role,
//       };

//       const tknservice = new TokenService();
//       const signedToken = tknservice.sign(validDatedUser);

//       // express session to save session in db without cookies in frontend
//       return signedToken;
//     }
//   };
// }
