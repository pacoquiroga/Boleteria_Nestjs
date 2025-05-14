import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { CreateUserDto } from '../src/user/dto/create-user.dto';
import { LoginDto } from '../src/auth/types.d/auth.interface';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { UserRol } from '../src/user_rol/entities/user_rol.entity';
import { Rol } from '../src/rol/entities/rol.entity';
import { UserService } from '../src/user/user.service';
import { UserRolService } from '../src/user_rol/user_rol.service';
import { RolService } from '../src/rol/rol.service';
import { Repository } from 'typeorm';
import { RoleType } from '../src/rol/enums/enums';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        UserRolService,
        RolService,
        { provide: JwtService, useValue: { signAsync: jest.fn().mockResolvedValue('mocked_token') } },
        { provide: getRepositoryToken(User), useClass: Repository },
        { provide: getRepositoryToken(UserRol), useClass: Repository },
        { provide: getRepositoryToken(Rol), useClass: Repository },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should signup a user and return an access token', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test',
        lastname: 'User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpass',
        phone: '1234567890',
        rol: RoleType.USER,
      };
      const result = {
        access_token: 'mocked_token',
        user: {
          id: 1,
          username: 'testuser',
          name: 'Test',
          lastname: 'User',
          email: 'test@example.com',
          rol: RoleType.USER,
        },
      };
      (authController as any).signup = jest.fn().mockResolvedValue(result);
      await expect(authController.signup(createUserDto)).resolves.toEqual(result);
    });
  });

  describe('login', () => {
    it('should login a user and return an access token', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'testpass',
      };
      const result = {
        access_token: 'mocked_token',
        user: {
          id: 1,
          username: 'testuser',
          name: 'Test',
          lastname: 'User',
          email: 'test@example.com',
          rol: RoleType.USER,
        },
      };
      (authController as any).login = jest.fn().mockResolvedValue(result);
      await expect(authController.login(loginDto)).resolves.toEqual(result);
    });
  });
});
