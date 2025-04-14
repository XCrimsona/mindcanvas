import bcrypt from "bcryptjs";

export class PasswordService {
  #saltRounds = 12;
  constructor() {
    this.#saltRounds;
  }
  hashPassword = async (password: string): Promise<string> => {
    const saltStrength = await bcrypt.genSalt(this.#saltRounds);
    return await bcrypt.hash(password, saltStrength);
  };

  comparePasswords = async (
    plainTextPassword: string,
    hashPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  };
}
