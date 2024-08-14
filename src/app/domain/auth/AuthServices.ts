import bcrypt from "bcrypt";

import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "routing-controllers";

import { User } from "models/user";
import { IAuth, IAuthEmail, IAuthReset } from "types/auth";
import { createToken } from "utils/token";
import { CustomError } from "utils/customError";
import { EmailSender } from "infra/EmailSender";

const SALT = 10;
const EXPIRED_TIME = 60 * 60 * 1000; // 1h

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

  async sendCode({ email }: IAuthEmail) {
    try {
      const existedUser = await User.findOne({ email });

      if (!existedUser) throw new NotFoundError("Email not found!");

      const resetPasswordCode = Math.random() * (9999 - 1000) + 1000;

      const resetPasswordDate = Date.now() + EXPIRED_TIME;

      existedUser.resetPasswordCode = resetPasswordCode.toString();
      existedUser.resetPasswordDate = resetPasswordDate;

      await existedUser.save();

      EmailSender.sendCode(email, resetPasswordCode);

      return { message: "Code sended." };
    } catch (e) {
      throw e;
    }
  }

  async checkCode({ email }: IAuthEmail) {
    try {
      const existedUser = await User.findOne({ email });

      if (!existedUser) throw new NotFoundError("Email not found!");

      const isExpired = existedUser?.resetPasswordDate > Date.now();

      if (
        isExpired ||
        !existedUser?.resetPasswordDate ||
        !existedUser?.resetPasswordCode
      )
        throw new BadRequestError("User have no reset code.");

      return { code: existedUser.resetPasswordCode };
    } catch (e) {
      throw e;
    }
  }

  async resetPassword({ email, password, code }: IAuthReset) {
    try {
      const {code: validCode} = await this.checkCode({ email });

      if (validCode != code) throw new NotFoundError("Email not found!");

      const hashedPassword = await bcrypt.hash(password, SALT);

      await User.findOneAndUpdate({ email }, { password: hashedPassword });

      return { message: "Password updated!" };
    } catch (e) {
      throw e;
    }
  }
}
