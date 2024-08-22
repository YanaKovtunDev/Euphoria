import {
  Body,
  JsonController,
  Patch,
  Req,
  UseBefore,
} from "routing-controllers";
import { UserServices } from "./UserService";
import { AuthMiddleware } from "middlewares/token";
import { UserDto } from "./User.dto";
import { IReqUser } from "types/user";

@JsonController("/user")
export default class User {
  private service = new UserServices();

  @Patch("/")
  @UseBefore(AuthMiddleware)
  async updateUser(@Req() { user }: IReqUser, @Body() body: UserDto) {
    return this.service.updateUser(user, body);
  }
}
