import { Module } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import { ProfilePictureEntry } from './entities/profile-picture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
// import { UsersModule } from 'src/users/users.module';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [
    HttpModule, 
    TypeOrmModule.forFeature([ProfilePictureEntry]),
    UsersModule
  ],
  controllers: [ ProfilePictureController],
  providers: [ProfilePictureService],
})
export class ProfilePictureModule {}
