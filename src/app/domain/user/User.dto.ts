import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  country!: string;

  @IsString()
  companyName!: string;

  @IsString()
  streetAddress!: string;

  @IsString()
  apt!: string;

  @IsString()
  city!: string;

  @IsString()
  state!: string;

  @IsString()
  phone!: string;

  @IsNumber()
  postalCode!: number;

  @IsString()
  deliveryInstruction!: string;

  @IsBoolean()
  defaultShippingAddress!: boolean;

  @IsBoolean()
  defaultBillingAddress!: boolean;
}
