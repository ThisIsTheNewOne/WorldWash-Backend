import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
// import { UsersService } from '../src/users/users.service';
import { UsersService } from './../src/users/users.service';
import { AuthenticationService } from './../src/authentication/authentication.service';
import { UserEntity } from './../src/authentication/entities/user';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm'
import { TestAppModule } from './../src/test-app.module';

describe('AppController (e2e)', () => { 
    let app: INestApplication;
    let usersService: UsersService;
    let authService: AuthenticationService;
    let usersRepository: Repository<UserEntity>
    let connection: Connection

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
          // imports: [TestAppModule]
        }).compile();

        app = moduleFixture.createNestApplication();

        connection = moduleFixture.get(Connection)
  
        usersService = moduleFixture.get(UsersService);
        authService = moduleFixture.get(AuthenticationService);
        usersRepository = moduleFixture.get(getRepositoryToken(UserEntity))
        // usersRepository.query("DELETE FROM user_entity")

        await app.init();
    });

      describe('Signup', () => {
        it('should create a user', async () => {
          const userTest = "userTestW123!!"
          const passwordTest = "UserTestW123!!"
          const licencePlate = "A123VVb"


          const user = { username: userTest, password: passwordTest, licencePlate: licencePlate  };

          // Act
          const {body} = await request(app.getHttpServer())
                            .post('/signup')
                            .send(user)
                            .expect(201)

          // console.log(body);
                            
          expect(body.username).toEqual(userTest);
          expect(body.role).toEqual("user");
          expect(body.id).toBeDefined();
        });
    })


    afterAll(async () => {
      await app.close();
    });

});