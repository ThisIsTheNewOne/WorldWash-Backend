import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthenticationService {
  // WHAT IS A CONSTRUCTOR IN THIS SITUATION ?
  constructor(
    private usersService: UsersService,
    // private jwtService: JwtService,
  ) {}


  async signup(user: any): Promise<any> {
    try {
      await this.usersService.create(user.username, user.password, user.licensePlate);
      return { message: 'User created successfully' }; 
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST); 
    }
  }


  create(createAuthenticationDto: CreateAuthenticationDto) {
    return 'This action adds a new authentication';
  }

  findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
