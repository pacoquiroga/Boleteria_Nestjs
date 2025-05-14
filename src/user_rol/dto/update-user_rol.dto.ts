import { PartialType } from '@nestjs/mapped-types';
import { CreateUserRolDto } from './create-user_rol.dto';

export class UpdateUserRolDto extends PartialType(CreateUserRolDto) {}
