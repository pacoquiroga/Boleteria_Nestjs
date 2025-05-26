import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryManageDto } from './create-categoryManage.dto';

export class UpdateCategoryManageDto extends PartialType(
  CreateCategoryManageDto,
) {}
