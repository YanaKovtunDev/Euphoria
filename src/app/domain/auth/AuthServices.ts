import bcrypt from "bcrypt";

import { BadRequestError, InternalServerError } from "routing-controllers";

import { User } from "models/user";
import { IAuth } from "types/auth";
import { createToken } from "utils/token";
import { CustomError } from "utils/customError";

const SALT = 10;

export default class AuthServices {
  async signIn({ email, password }: IAuth) {
    try {
      const userData = await User.findOne({ email });

      if (!userData) throw new BadRequestError("Incorrect email!");

      const isCorrectPassword = await bcrypt.compare(
        password,
        userData.password,
      );

      if (!isCorrectPassword)
        throw new BadRequestError("Incorrect email or password!");

      const token = createToken(userData.id);

      if (!token) throw new InternalServerError("Token creation error!");

      return { token };
    } catch (e) {
      throw e;
    }
  }

  async signUp({ email, password }: IAuth) {
    try {
      const existedUser = await User.findOne({ email });

      if (existedUser) throw new CustomError(409, "User already exists!");

      const hashedPassword = await bcrypt.hash(password, SALT);

      User.create({ email, password: hashedPassword });

      return { message: "User created successfully" };
    } catch (e) {
      throw e;
    }
  }
}
