import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRolService } from './user_rol.service';
import { CreateUserRolDto } from './dto/create-user_rol.dto';
import { UpdateUserRolDto } from './dto/update-user_rol.dto';

@Controller('user-rol')
export class UserRolController {
  constructor(private readonly userRolService: UserRolService) {}

  @Post()
  create(@Body() createUserRolDto: CreateUserRolDto) {
    return this.userRolService.create(createUserRolDto);
  }

  @Get()
  findAll() {
    return this.userRolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRolDto: UpdateUserRolDto) {
    return this.userRolService.update(+id, updateUserRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolService.remove(+id);
  }
}
