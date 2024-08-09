require("dotenv").config();
import { Database } from "./Database";
import { Tcp } from "./Tcp";

export class App {
  private static instance: App;

  private tcp = new Tcp();
  private database = new Database();

  constructor() {
    if (!App.instance) App.instance = this;

    return App.instance;
  }

  async init() {
    const { tcp, database } = this;

    await database.init();
    await tcp.init();
  }
}
