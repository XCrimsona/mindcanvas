import bcrypt from "bcryptjs";

export class PasswordService {
  #saltStrength = 12;

  hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(this.#saltStrength);
    return await bcrypt.hash(password, salt);
  };

  comparePasswords = async (
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean> => {
    const match = await bcrypt.compare(plainTextPassword, hashPassword);
    console.log("comparing: ", match);
    return match;
  };
}
