import {
  Body,
  Get,
  JsonController,
  Patch,
  Req,
  UseBefore,
} from "routing-controllers";
import { UserServices } from "./UserService";
import { AuthMiddleware } from "middlewares/token";
import { EmailDto, PasswordDto, PhoneDto, UserDto } from "./User.dto";
import { IReqUser } from "types/user";

@JsonController("/user")
export default class User {
  private service = new UserServices();

  @Get("/")
  @UseBefore(AuthMiddleware)
  async getUserByToken(@Req() { user }: IReqUser) {
    return this.service.getUserByToken(user);
  }

  @Patch("/")
  @UseBefore(AuthMiddleware)
  async updateUser(@Req() { user }: IReqUser, @Body() body: UserDto) {
    return this.service.updateUser(user, body);
  }

  @Patch("/email")
  @UseBefore(AuthMiddleware)
  async updateEmail(@Req() { user }: IReqUser, @Body() { email }: EmailDto) {
    return this.service.updateEmail(user, email);
  }

  @Patch("/email")
  @UseBefore(AuthMiddleware)
  async updatePhone(@Req() { user }: IReqUser, @Body() { phone }: PhoneDto) {
    return this.service.updatePhone(user, phone);
  }

  @Patch("/password")
  @UseBefore(AuthMiddleware)
  async updatePassword(
    @Req() { user }: IReqUser,
    @Body() { password }: PasswordDto,
  ) {
    return this.service.updatePassword(user, password);
  }
}
