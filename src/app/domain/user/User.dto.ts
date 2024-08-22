import { Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";

export class UserDto {
  @Expose()
  @IsString()
  firstName!: string;

  @Expose()
  @IsString()
  lastName!: string;

  @Expose()
  @IsString()
  country!: string;

  @Expose()
  @IsString()
  companyName!: string;

  @Expose()
  @IsString()
  streetAddress!: string;

  @Expose()
  @IsString()
  apt!: string;

  @Expose()
  @IsString()
  city!: string;

  @Expose()
  @IsString()
  state!: string;

  @Expose()
  @IsString()
  phone!: string;

  @Expose()
  @IsNumber()
  postalCode!: number;

  @Expose()
  @IsString()
  deliveryInstruction!: string;

  @Expose()
  @IsBoolean()
  defaultShippingAddress!: boolean;

  @Expose()
  @IsBoolean()
  defaultBillingAddress!: boolean;
}

export class EmailDto {
  @IsString()
  @IsEmail()
  email!: string;
}

export class PhoneDto {
  @IsString()
  phone!: string;
}

export class PasswordDto {
  @IsString()
  password!: string;
}
