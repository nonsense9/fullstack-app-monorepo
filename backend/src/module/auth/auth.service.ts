import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import bcrypt = require("bcrypt");
import { LoginUserDto } from "./dto/login-user.dto";

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {
  }

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
      }
    });
    console.log('user', user)
    const { password, ...result } = user;
    return result
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({ where: { email: loginUserDto.email } }) as LoginUserDto;
    if (!user) {
      throw new UnauthorizedException()
    }
    const validPassword = await bcrypt.compare(loginUserDto.password, user.password)
    if (!validPassword) {
      throw new UnauthorizedException()
    }
    const { password, ...result } = user;
    return result;
  }
}
