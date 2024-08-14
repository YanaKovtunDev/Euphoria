import { IsEmail, IsString, MinLength } from "class-validator";

export class Email {
  @IsString()
  @IsEmail()
  email!: string;
}
export class User extends Email {
  @IsString()
  @MinLength(8)
  password!: string;
}

export class Reset extends User {
  @IsString()
  code!: string;
}
