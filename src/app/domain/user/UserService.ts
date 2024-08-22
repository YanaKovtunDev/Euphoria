import { User } from "models/user";
import { NotFoundError } from "routing-controllers";
import { IUserInfo, IUserTokenData } from "types/user";

export class UserServices {
  async updateUser({ id }: IUserTokenData, body: IUserInfo) {
    const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

    if (!updatedUser) throw new NotFoundError("User not found");

    return updatedUser;
  }
}
