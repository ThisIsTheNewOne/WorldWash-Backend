import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../authentication/entities/user';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfilePictureEntry } from '../profile-picture/entities/profile-picture.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
