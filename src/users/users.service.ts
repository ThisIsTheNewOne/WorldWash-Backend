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

    async findByUsername(username: string) {
      return this.userRepository.findOne({ where: { username } });
    }

    async findUserById(id: number) : Promise<UserEntity> {
      return this.userRepository.findOne({where: {id: id}});
  }

    async findById(id: number) {
      return this.userRepository.findOne({ where: { id } });
    }
        
    async updateRole(id: number, role: Role) {
      const user = await this.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      user.role = role;
      return this.userRepository.save(user);
    } 
}
