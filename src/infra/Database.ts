import mongoose from "mongoose";

const { DB_HOST } = process.env;

export class Database {
  private static instance: Database;

  constructor() {
    if (!Database.instance) Database.instance = this;

    return Database.instance;
  }

  async init() {
    await mongoose.set("strictQuery", true);

    try {
      if (DB_HOST) {
        await mongoose.connect(DB_HOST);

        console.log("Database connected!");
      } else {
        throw new Error("Database connection error!!!");
      }
    } catch (e) {
      console.log(e);
    }
  }
}
