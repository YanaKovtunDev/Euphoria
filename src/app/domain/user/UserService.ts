import bcrypt from "bcrypt";
import { User } from "models/user";
import { IUserInfo, IUserTokenData } from "types/user";

const { SALT } = process.env;

export class UserServices {
  async getUserByToken({ id }: IUserTokenData) {
    return await User.findById(id).select("-password");
  }

  async updateUser({ id }: IUserTokenData, body: IUserInfo) {
    return await User.findByIdAndUpdate(id, body, { new: true }).select(
      "-password",
    );
  }

  async updateUserName({ id }: IUserTokenData, name: string) {
    const splittedName = name.split(" ");
    const lastName = splittedName.slice(1).join(" ");

    return await User.findByIdAndUpdate(
      id,
      { lastName, firstName: splittedName[0] },
      { new: true },
    ).select("-password");
  }

  async updateEmail({ id }: IUserTokenData, email: string) {
    return await User.findByIdAndUpdate(id, { email }, { new: true }).select(
      "-password",
    );
  }

  async updatePhone({ id }: IUserTokenData, phone: string) {
    return await User.findByIdAndUpdate(id, { phone }, { new: true }).select(
      "-password",
    );
  }

  async updatePassword({ id }: IUserTokenData, password: string) {
    const hashedPassword = await bcrypt.hash(password, SALT || 10);

    return await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true },
    ).select("-password");
  }
}
