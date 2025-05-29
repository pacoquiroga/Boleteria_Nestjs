import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';
import { RoleType } from './enums/enums';

@Injectable()
export class RolService implements OnModuleInit {
  constructor(
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
  ) {}

  async onModuleInit() {
    await this.seedDefaultRoles();
  }

  private async seedDefaultRoles() {
    const defaultRoles = [
      { rolName: RoleType.USER, rolDescription: 'Usuario regular del sistema' },
      { rolName: RoleType.ORGANIZER, rolDescription: 'Organizador de eventos' },
    ];

    for (const role of defaultRoles) {
      const exists = await this.rolRepository.findOne({
        where: { rolName: role.rolName },
      });

      if (!exists) {
        const rol = this.rolRepository.create(role);
        await this.rolRepository.save(rol);
        console.log(`Rol ${role.rolName} creado exitosamente`);
      } else {
        console.log(`Rol ${role.rolName} ya existe`);
      }
    }
  }

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
      where: { id },
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
      return await this.rolRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Error updating rol: ' + error);
    }
  }

  async remove(id: number) {
    return await this.rolRepository.delete(id);
  }
}
