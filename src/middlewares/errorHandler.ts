import { Request, Response } from "express";
import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
} from "routing-controllers";

@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: Error,
    _: Request,
    response: Response,
    next: (err: Error) => void,
  ) {
    if (error instanceof HttpError) {
      const { httpCode, name, ...res } = error;

      response.status(error.httpCode).json(res);
    }

    next(error);
  }
}
