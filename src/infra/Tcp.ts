import express from "express";

import { useExpressServer } from "routing-controllers";

const { PORT } = process.env;
export class Tcp {
  private static instance: Tcp;

  private routePrefix = "/api";
  private server = express();

  constructor() {
    if (!Tcp.instance) Tcp.instance = this;

    return Tcp.instance;
  }

  init() {
    const { server, routePrefix } = this;

    useExpressServer(server, {
      routePrefix,
      cors: true,
      defaultErrorHandler: true,
    });

    return new Promise<boolean>((resolve: (res: boolean) => void) => {
      server.listen(PORT || 8080, () => {
        console.log(`Server started! Port: ${PORT || "8080"}!`);

        return resolve(true);
      });
    });
  }
}
