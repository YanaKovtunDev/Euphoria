import { HttpError } from "routing-controllers";

export class CustomError extends HttpError {
  constructor(operationStatus: number, operationMessage: string) {
    super(operationStatus, operationMessage);
  }
}
