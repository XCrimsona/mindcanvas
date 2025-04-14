import { PasswordService } from "./hashing";
import UserModel from "@/models/userModel";
import { TokenService } from "@/app/auth/JwtTokenService";

interface Register {
  firstname: string;
  lastname: string;
  gender?: String | null;
  dob?: string | null;
  email: string;
  password: string;
  confirmpassword: string;
}
export class auth {
  #JWT_SECRET: string;
  #DB_STRING: string;
  private tokenService: TokenService;
  private passwordService: PasswordService;
  constructor() {
    this.#JWT_SECRET = process.env.JWT_SECRET!;
    this.#DB_STRING = process.env.DB_STRING!;
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService(this.#JWT_SECRET);
  }

  signup = async (userInput: Register): Promise<void> => {
    const {
      firstname,
      lastname,
      gender,
      dob,
      email,
      password,
      confirmpassword,
    } = userInput;
    if (password !== confirmpassword || confirmpassword !== password) {
      throw new Error("Passwords do not match!");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("That email already exists!");
    } else {
      const hashpassword = await this.passwordService.hashPassword(password);
      await UserModel.create({
        firstname,
        lastname,
        gender,
        email,
        dob,
        password: hashpassword,
        role: "base-access",
      });
    }
  };

  signin = async (email: string, password: string) => {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) throw new Error("That email does not exist!");

    const isValid = await this.passwordService.comparePasswords(
      password,
      existingUser.password
    );
    if (!isValid) throw new Error("Not Authorized, Incorrect Credentials");
    return this.#signinToken(existingUser.email, existingUser.role);
  };

  #signinToken = (email: string, role: string) => {
    return this.tokenService.sign({ email, role });
  };

  //decryption is already part of the encryption file why make another decrpyt module inside the class, forsaken?
}
