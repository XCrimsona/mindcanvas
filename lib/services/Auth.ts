import { PasswordService } from "./Hashing";
import UserModel from "@/models/userModel";
import { TokenService } from "@/lib/services/JwtTokenService";

interface Register {
  firstname: string;
  lastname: string;
  gender?: string | null;
  dob?: string | null;
  email: string;
  password: string;
  confirmpassword: string;
}
export class AuthService {
  private tokenService: TokenService;
  private passwordService: PasswordService;
  constructor() {
    this.passwordService = new PasswordService();
    this.tokenService = new TokenService();
  }

  signup = async (userInput: Register): Promise<void> => {
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

  #signinToken = (sub: string, role: string) => {
    return this.tokenService.sign({ sub, role });
  };

  #verifyToken = (sub: string) => {
    return this.tokenService.verify(sub);
  };
}
