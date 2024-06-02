import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './authentication/entities/user';
import { ProfilePictureEntry } from './profile-picture/entities/profile-picture.entity';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:', // In-memory database for tests
      synchronize: true,
      autoLoadEntities: true,
      entities: [UserEntity, ProfilePictureEntry], // Include necessary entities explicitly
    }),
    TypeOrmModule.forFeature([UserEntity, ProfilePictureEntry]), // Include necessary entities
    UsersModule,
    AuthenticationModule,
  ],
})
export class TestAppModule {}