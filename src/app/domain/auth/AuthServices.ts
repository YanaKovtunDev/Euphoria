import { InternalServerError } from "routing-controllers";
import { IAuth } from "types/auth";
import { createToken } from "utils/tokent";

export default class AuthServices {
  async signIn({ email, password }: IAuth) {
    try {
      console.log("email, password", email, password);

      const token = createToken();

      if (!token) throw new InternalServerError("Token creation error!");

      return { token };
    } catch (e) {
      throw e;
    }
  }
}
