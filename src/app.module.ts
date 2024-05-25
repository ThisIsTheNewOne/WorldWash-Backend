import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './data.source';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfilePictureModule } from './profile-picture/profile-picture.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfig),
    AuthenticationModule,
    ProfilePictureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
