import { ArrayMinSize, ArrayNotEmpty, IsArray, IsInt, IsNumber, IsString } from "class-validator";

export class Item {
  @IsString()
  type!: string;

  @IsNumber()
  price!: number;

  @IsString()
  color!: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  size!: string[];

  @IsString()
  photo?: string;

  @IsString()
  style!: string;
}

export class Comment {
  @IsString()
  comment!: string;
}

export class Rating {
  @IsInt()
  rating!: number;
}
