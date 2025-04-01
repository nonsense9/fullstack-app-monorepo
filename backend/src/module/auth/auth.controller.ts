import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { AuthGuard } from "./auth.guard";
import { CurrentUser } from "../../decorators/currentUser";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post("login")
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body)
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post("refresh")
  async refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshTokens(body);
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@CurrentUser() user) {
    return { user }
  }
}
