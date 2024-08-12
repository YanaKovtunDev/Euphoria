import { Body, HttpCode, JsonController, Post } from "routing-controllers";

import AuthServices from "./AuthServices";

import { User } from "./Auth.dto";

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
}
