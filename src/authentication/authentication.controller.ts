import {
  Controller,
  Post,
  UseGuards,
  Get,
  Request as Request2,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async signup(@Request2() req) {
    return this.authenticationService.signup(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request2() req) {
    return this.authenticationService.login(req.user);
  }

  @Get('dummyTest')
  getHello(): string {
    return "HAHAHAHA";
  }
}
