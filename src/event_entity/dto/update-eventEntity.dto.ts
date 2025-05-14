import { PartialType } from '@nestjs/mapped-types';
import { CreateEventEntityDto } from './create-eventEntity.dto';

export class UpdateEventEntityDto extends PartialType(CreateEventEntityDto) {}
