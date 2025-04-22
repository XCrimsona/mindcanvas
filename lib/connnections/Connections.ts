import mongoose from "mongoose";

export class ConnectToDB {
  #DB_STRING: string;
  constructor() {
    this.#DB_STRING = process.env.DB_CONNECTION_STRING!;
  }
  async ConnectToDB(): Promise<void> {
    try {
      mongoose.connect(this.#DB_STRING);
      console.warn("Connection Established!");
    } catch (err: any) {
      console.warn("Connection Interrupted!");
      throw new Error(err.message);
    }
  }
}

export const getDB = async () => {
  const db = new ConnectToDB();
  await db.ConnectToDB();
};
