require("dotenv").config();

import "reflect-metadata";

import { Tcp } from "./Tcp";

export class App {
  private static instance: App;

  private tcp = new Tcp();

  constructor() {
    if (!App.instance) App.instance = this;

    return App.instance;
  }

  async init() {
    const { tcp } = this;

    await tcp.init();
  }
}
