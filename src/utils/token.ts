import * as jwt from "jsonwebtoken";

const { JWT_KEY } = process.env;

export const createToken = (id: string) =>
  JWT_KEY ? jwt.sign({ id }, JWT_KEY) : null;
