import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { Role } from "@prisma/client";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

interface UserEntity {
  id: number;
  email: string;
  password: string;
  role: Role;
  refreshToken?: string;
}

@Injectable()
export class AuthService {
  
  constructor(private prisma: PrismaService, private jwtService: JwtService) {
  }
  
  async validateToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  
  async register(createUserDto: CreateUserDto) {
    try {
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
          role: createUserDto.role
        }
      });
      const { password, ...result } = user;
      return result
    } catch (err) {
      console.error('Registration error:', err);
      throw err;
    }
  }
  
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const decoded = await this.jwtService.verify(refreshTokenDto.refreshToken, {
        secret: process.env.JWT_SECRET
      });
      if (!decoded) {
        throw new UnauthorizedException('Refresh token is not valid');
      }
      
      const { sub } = decoded.sub;
      const user = await this.prisma.user.findUnique({
        where: { id: sub },
        select: {
          id: true,
          email: true,
        }
      });
      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }
      const refreshTokens = this.generateTokens(user)
      return {
        ...user,
        ...refreshTokens
      }
    } catch (e) {
      throw new UnauthorizedException('Unsupported refresh token or refresh token is not valid');
    }
  }
  
  private generateTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' })
    };
  }
  
  private async updateRefreshToken(userId: number, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    });
  }
  
  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.validateUser(loginUserDto) as UserEntity;
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      
      const tokens = this.generateTokens(payload)
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return {
        ...payload,
        ...tokens
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
  
  async validateUser(loginUserDto: LoginUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserDto.email },
        select: {
          id: true,
          email: true,
          password: true,
          role: true
        }
      }) as LoginUserDto;
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      
      const validPassword = await bcrypt.compare(loginUserDto.password, user.password);
      
      if (!validPassword) {
        throw new UnauthorizedException('Invalid password');
      }
      
      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.error('User validation error:', error);
      throw error;
    }
  }
}
