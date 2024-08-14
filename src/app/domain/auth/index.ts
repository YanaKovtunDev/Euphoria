import {
  Body,
  HttpCode,
  JsonController,
  Patch,
  Post,
} from "routing-controllers";

import AuthServices from "./AuthServices";

import { Email, Reset, User } from "./Auth.dto";

@JsonController("/auth")
export default class Auth {
  private service = new AuthServices();

  @Post("/signIn")
  async signIn(@Body() body: User) {
    return this.service.signIn(body);
  }

  @HttpCode(201)
  @Post("/signUp")
  async signUp(@Body() body: User) {
    return this.service.signUp(body);
  }

  @Post("/send-code")
  async sendCode(@Body() body: Email) {
    return this.service.sendCode(body);
  }

  @Post("/check-code")
  async checkCode(@Body() body: Email) {
    return this.service.checkCode(body);
  }

  @Patch("/update-password")
  async updatePassword(@Body() body: Reset) {
    return this.service.resetPassword(body);
  }
}
