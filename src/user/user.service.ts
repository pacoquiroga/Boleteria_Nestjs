import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRolService } from 'src/user_rol/user_rol.service';
import { Rol } from 'src/rol/entities/rol.entity';
import { CreateUserRolDto } from 'src/user_rol/dto/create-user_rol.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
  constructor(
    private readonly userRolService: UserRolService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) { }

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
    })

    const existingRol = await this.rolRepository.findOne({
      where: { rolName: createUserDto.rol},
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
        rolName: existingRol.rolName,
        idUser: savedUser.idUser,
        since: new Date(),
      };
      const savedUserRol = await this.userRolService.create(userRol);
      console.log('UserRol created:', savedUserRol);
      return savedUser;
    }catch (error){
      throw new Error('Error creating user: ' + error.message);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
