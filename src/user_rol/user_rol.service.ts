import { Injectable } from '@nestjs/common';
import { CreateUserRolDto } from './dto/create-user_rol.dto';
import { UpdateUserRolDto } from './dto/update-user_rol.dto';
import { In, Repository } from 'typeorm';
import { UserRol } from './entities/user_rol.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRolService {
  constructor(
    @InjectRepository(UserRol)
    private userRolRepository: Repository<UserRol>,
  ){}

  async create(createUserRolDto: CreateUserRolDto) {
    try{
      const userRol = this.userRolRepository.create(createUserRolDto);
      return await this.userRolRepository.save(userRol);
    }catch (error) {
      throw new Error('Error creating userRol: ' + error.message + "Status: " + error.status);
    }
  }

  findAll() {
    return `This action returns all userRol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRol`;
  }

  update(id: number, updateUserRolDto: UpdateUserRolDto) {
    return `This action updates a #${id} userRol`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRol`;
  }
}
