require("dotenv").config();

import "reflect-metadata";

import { Database } from "./Database";
import { Tcp } from "./Tcp";
import { EmailSender } from "./EmailSender";

export class App {
  private static instance: App;

  private tcp = new Tcp();
  private database = new Database();
  private emailSender = new EmailSender();

  constructor() {
    if (!App.instance) App.instance = this;

    return App.instance;
  }

  async init() {
    const { tcp, database, emailSender } = this;

    await database.init();
    await tcp.init();
    emailSender.init();
  }
}
