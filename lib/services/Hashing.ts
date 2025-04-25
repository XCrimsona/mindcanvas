import bcrypt from "bcryptjs";

export class PasswordService {
  private readonly = 12;

  hashPassword = async (password: string): Promise<string> => {
    const saltStrength = await bcrypt.genSalt(this.readonly);
    return await bcrypt.hash(password, saltStrength);
  };

  comparePasswords = async (
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean> => {
    console.log(
      "comparing: ",
      await bcrypt.compare(plainTextPassword, hashPassword)
    );
    return await bcrypt.compare(plainTextPassword, hashPassword);
  };
}
