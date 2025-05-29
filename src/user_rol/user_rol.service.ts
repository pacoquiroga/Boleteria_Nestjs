import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserRolDto } from './dto/create-user_rol.dto';
import { UpdateUserRolDto } from './dto/update-user_rol.dto';
import { Repository } from 'typeorm';
import { UserRol } from './entities/user_rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolService } from '../rol/rol.service';
import { UserService } from '../user/user.service';

@Injectable()
export class UserRolService {
  constructor(
    private readonly rolService: RolService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @InjectRepository(UserRol)
    private userRolRepository: Repository<UserRol>,
  ) {}

  async create(createUserRolDto: CreateUserRolDto) {
    try {
      const existingUser = await this.userService.findOne(
        createUserRolDto.idUser,
      );
      const existingRol = await this.rolService.findOne(createUserRolDto.idRol);
      const userRol = this.userRolRepository.create({
        since: createUserRolDto.since,
        until: createUserRolDto.until,
        user: existingUser,
        rol: existingRol,
      });
      return await this.userRolRepository.save(userRol);
    } catch (error) {
      throw new Error('Error creating userRol: ' + error);
    }
  }

  async findAll() {
    try {
      return await this.userRolRepository.find();
    } catch (error) {
      throw new Error('Error finding userRols: ' + error);
    }
  }

  async findOne(id: number) {
    const userRol = await this.userRolRepository.findOne({
      where: { id },
      relations: ['user', 'rol'],
    });
    if (!userRol) {
      throw new Error('UserRol not found');
    }
    return userRol;
  }

  async update(id: number, updateUserRolDto: UpdateUserRolDto) {
    const existingUserRol = await this.findOne(id);

    try {
      if (updateUserRolDto.idUser) {
        const existingUser = await this.userService.findOne(
          updateUserRolDto.idUser,
        );
        existingUserRol.user = existingUser;
      }
      if (updateUserRolDto.idRol) {
        const existingRol = await this.rolService.findOne(
          updateUserRolDto.idRol,
        );
        existingUserRol.rol = existingRol;
      }
      Object.assign(existingUserRol, updateUserRolDto);
      await this.userRolRepository.save(existingUserRol);
      return await this.userRolRepository.findOne({
        where: { id },
        relations: ['user', 'rol'],
      });
    } catch (error) {
      throw new Error('Error updating userRol: ' + error);
    }
  }

  async findUserRolByUserId(id: number) {
    const userRol = await this.userRolRepository.findOne({
      where: { user: { id } },
      relations: ['user', 'rol'],
    });
    if (!userRol) {
      throw new Error('UserRol not found');
    }
    return userRol;
  }

  async findUserByRoleName(roleName: string) {
    try {
      return await this.userRolRepository.findOne({
        where: { rol: { rolName: roleName } },
        relations: ['user', 'rol'],
      });
    } catch (error) {
      console.error(`Error finding user by role name ${roleName}:`, error);
      return null;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} userRol`;
  }
}
