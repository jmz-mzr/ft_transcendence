import { AuthService } from '@/auth/auth.service';
import { DUser } from '@/decorators/user.decorator';
import { Controller, Get, Res, UseGuards, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { CookieOptions, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('42'))
  @Get('42')
  async loginWithFortyTwo(): Promise<void> {
    // Empty
  }

  getCookieOptions(): CookieOptions {
    return {
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24,
    };
  }

  @UseGuards(AuthGuard('42'))
  @Get('42/callback')
  async loginWithFortyTwoCallback(
    @DUser() user: User,
    @Res() res: Response,
  ): Promise<void> {
    const jwt = this.authService.login(user);

    res.cookie('jwt', jwt.accessToken, this.getCookieOptions());

    if (user.has2FA) {
      res.redirect(
        this.configService.get<string>('FRONTEND_URL', 'localhost:4000') +
          '/check2FA',
      );
    } else {
      res.cookie('2FA', 'disabled', this.getCookieOptions());
      res.redirect(
        this.configService.get<string>('FRONTEND_URL', 'localhost:4000'),
      );
    }
  }

  // 2FAuthenticator
  @UseGuards(AuthGuard('42'))
  @Post('verify2FA')
  async verify2FA(
    @DUser() user: User,
    @Body('token') token: string,
    @Res() res: Response,
  ): Promise<Response> {
    console.log({ token });
    const isValid = await this.authService.verify2FA(user, token);

    if (isValid) {
      res.cookie('2FA', 'validated', this.getCookieOptions());
      return res.status(200).send();
    }
    throw new UnauthorizedException('2FA verification failed');
  }
}
