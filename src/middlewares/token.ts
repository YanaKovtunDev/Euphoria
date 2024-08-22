import {
  BadRequestError,
  ExpressMiddlewareInterface,
  NotFoundError,
  UnauthorizedError,
} from "routing-controllers";
import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "models/user";

const SECRET_KEY = "your-secret-key";

export class AuthMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, _: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) throw new UnauthorizedError("No token provided!");

    jwt.verify(token, SECRET_KEY, async (err, user) => {
      if (err) throw new BadRequestError("Invalid token!");

      const foundedUser = await User.findById(user);

      if (!foundedUser) throw new NotFoundError("User not found!");

      req.user = user;
      next();
    });
  }
}
