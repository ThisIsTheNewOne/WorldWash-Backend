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

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signup')
  async signup(@Request2() req) {
    console.log("body", req.body); 
    return this.authenticationService.signup(req.body);
  }

  @Get('dummyTest')
  getHello(): string {
    return "HAHAHAHA";
  }
}
