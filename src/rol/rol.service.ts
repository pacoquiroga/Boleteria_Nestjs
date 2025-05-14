import { Injectable } from '@nestjs/common';
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
  ) {}

  async create(createRolDto: CreateRolDto) {
    const existingRol = await this.rolRepository.findOne({
      where: { rolName: createRolDto.rolName },
    });

    if (existingRol) {
      throw new Error('Rol already exists');
    }

    try {
      const rol = this.rolRepository.create(createRolDto);
      return await this.rolRepository.save(rol);
    } catch (error) {
      throw new Error('Error creating rol: ' + error);
    }
  }

  async findAll() {
    try {
      return await this.rolRepository.find();
    } catch (error) {
      throw new Error('Error finding roles: ' + error);
    }
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({
      where: { idRol: id },
    });
    if (!rol) {
      throw new Error('Rol not found');
    }
    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto) {
    await this.findOne(id);

    try {
      await this.rolRepository.update(id, updateRolDto);
      return await this.rolRepository.findOne({ where: { idRol: id } });
    } catch (error) {
      throw new Error('Error updating rol: ' + error);
    }
  }

  async remove(id: number) {
    return await this.rolRepository.delete(id);
  }
}
