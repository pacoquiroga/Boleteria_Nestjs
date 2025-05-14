import { Inject, Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ){}

  async create(createRolDto: CreateRolDto) {
    const existingRol = await this.rolRepository.findOne({
      where: { rolName: createRolDto.rolName },
    })

    if (existingRol) {
      throw new Error('Rol already exists');
    }
    
    try{
      const rol = this.rolRepository.create(createRolDto);
      return await this.rolRepository.save(rol);
    }catch (error) {
      throw new Error('Error creating rol: ' + error.message + "Status: " + error.status);
    }
  }

  findAll() {
    return `This action returns all rol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rol`;
  }

  update(id: number, updateRolDto: UpdateRolDto) {
    return `This action updates a #${id} rol`;
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
