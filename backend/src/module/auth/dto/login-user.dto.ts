import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  role: Role
}
