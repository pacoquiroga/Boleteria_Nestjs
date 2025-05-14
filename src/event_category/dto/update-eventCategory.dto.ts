import { PartialType } from '@nestjs/mapped-types';
import { CreateEventCategoryDto } from './create-eventCategory.dto';

export class UpdateEventCategoryDto extends PartialType(CreateEventCategoryDto) {}
