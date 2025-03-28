import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
	@IsEmail({},{message: 'Please provide a valid email address'})
	@IsNotEmpty()
	email: string;
	
	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
