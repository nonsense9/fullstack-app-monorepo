import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from "@prisma/client";

export class CreateUserDto {
	@IsEmail({},{message: 'Please provide a valid email address'})
	@IsNotEmpty()
	email: string;
	
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;

	role: Role
}
