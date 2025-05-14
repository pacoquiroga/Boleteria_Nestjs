import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { UserRolService } from '../user_rol/user_rol.service';
import { Rol } from '../rol/entities/rol.entity';
import { CreateUserRolDto } from '../user_rol/dto/create-user_rol.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserRolService))
    private readonly userRolService: UserRolService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  private generarCadenaAleatoria(longitud: number): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._ñÑ';
    let resultado = '';

    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres[indice];
    }

    return resultado;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email, username: createUserDto.username },
    });

    const existingRol = await this.rolRepository.findOne({
      where: { rolName: createUserDto.rol },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    if (!existingRol) {
      throw new Error('Rol does not exist');
    }

    try {
      const salt = this.generarCadenaAleatoria(10);
      const bcryptSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        salt + createUserDto.password,
        bcryptSalt,
      );
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        salt,
      });
      const savedUser = await this.userRepository.save(user);
      console.log('User created:', savedUser);

      const userRol: CreateUserRolDto = {
        idRol: existingRol.idRol,
        idUser: savedUser.idUser,
        since: new Date(),
      };
      const savedUserRol = await this.userRolService.create(userRol);
      console.log('UserRol created:', savedUserRol);
      return savedUser;
    } catch (error) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: id } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: id } });

      if (!user) {
        throw new Error('User not found');
      }

      // Si se actualiza el email o username, verificar que no exista otro usuario con los mismos datos
      if (updateUserDto.email || updateUserDto.username) {
        const existingUser = await this.userRepository.findOne({
          where: [
            { email: updateUserDto.email, idUser: Not(id) },
            { username: updateUserDto.username, idUser: Not(id) },
          ],
        });

        if (existingUser) {
          throw new Error('Email or username already exists');
        }
      }

      // Si se actualiza la contraseña, hash la nueva contraseña
      if (updateUserDto.password) {
        const bcryptSalt = await bcrypt.genSalt(10);
        updateUserDto.password = await bcrypt.hash(
          user.salt + updateUserDto.password,
          bcryptSalt,
        );
      }

      await this.userRepository.update(id, updateUserDto);
      return await this.userRepository.findOne({ where: { idUser: id } });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: id } });

      if (!user) {
        throw new Error('User not found');
      }

      await this.userRepository.delete(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
}
