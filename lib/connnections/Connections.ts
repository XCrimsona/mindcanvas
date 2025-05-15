import mongoose from "mongoose";

class ConnectToDB {
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
  try {
    if (mongoose.connection.readyState >= 1) return;
    const db = new ConnectToDB();
    await db.ConnectToDB();
  } catch (err: any) {
    console.warn(
      "Something is wrong with the app core data connection: ",
      err.message
    );
  }
};
