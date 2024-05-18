import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthenticationService {
  // WHAT IS A CONSTRUCTOR IN THIS SITUATION ?
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  async signup(user: any): Promise<any> {
    try {
      const existingUser = await this.usersService.findByUsername(user.username);
      
      if (existingUser) {
        console.log("Username already exists")
        return { message: 'Username already exists', statusCode: 400 }; 
      } else {
        await this.usersService.create(user.username, user.password, user.licensePlate);
        return { message: 'User created successfully', statusCode: 200 }; 
      }
      
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST); 
    }
  }

  async login(user: any) {
    const payload = { 
      username: user.username, id: user.id
    };
    console.log("test testes", payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    console.log("user found", user);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      // console.log("user found removed password", result);
      
      return result;
    }
    return null;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
