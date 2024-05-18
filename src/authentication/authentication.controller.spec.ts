import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from './../users/users.service';
import { AuthenticationService } from './authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user';



describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        // Import TypeOrmModule and configure it to connect to your SQL database
          TypeOrmModule.forRoot({
            type: 'mysql', // Adjust the database type as needed
            host: '127.0.0.1',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'worldWash',
            entities: [UserEntity], // Add UserEntity to the entities array
            synchronize: true, // Automatically synchronize database schema (not recommended for production)
          }),
          TypeOrmModule.forFeature([UserEntity]), // Provide UserEntity to TypeOrmModule for testing
        ],
      controllers: [AuthenticationController],
      providers: [
        AuthenticationService,
        UsersService,
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('signup', () => {
  //   it('should call UsersService.create with the correct arguments', async () => {
  //     // Mock request body
  //     const user = { username: 'testuser', password: 'TestUserW!23', licensePlate: 'ABC123' };

  //     // Call the signup method of the controller
  //     // await controller.signup(user);

  //     // Assert that UsersService.create was called with the correct arguments
  //     // expect(usersService.create).toHaveBeenCalledWith(user.username, user.password, user.licensePlate);
  //   });
  // })

});
