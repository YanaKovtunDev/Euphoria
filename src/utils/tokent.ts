import * as jwt from "jsonwebtoken";

const { KEY } = process.env;

export const createToken = () => KEY ? jwt.sign({ id: 123 }, KEY) : null;
