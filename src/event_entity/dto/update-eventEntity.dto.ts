import { PartialType } from '@nestjs/mapped-types';
import { CreateEventEntityDto } from './create-eventEntity.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EventState } from '../enums/event-state.enum';

export class UpdateEventEntityDto extends PartialType(CreateEventEntityDto) {
  @IsOptional()
  @IsEnum(EventState, {
    message: `El estado del evento debe ser uno de los siguientes: ${Object.values(EventState).join(', ')}`,
  })
  state?: EventState;
}
