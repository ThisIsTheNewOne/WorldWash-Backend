import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './../authentication/entities/user';
import { Repository } from 'typeorm';
import { Role } from './role';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async create(username: string, password: string,  licensePlate: string) {
        return this.userRepository.save({username, password, licensePlate}) // Never save passwords in clear text!
    }
        
}
