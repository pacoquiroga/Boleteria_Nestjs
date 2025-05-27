import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryManageService } from './categoryManage.service';
import { CreateCategoryManageDto } from './dto/create-categoryManage.dto';
import { UpdateCategoryManageDto } from './dto/update-categoryManage.dto';

@Controller('category-manage')
export class CategoryManageController {
  constructor(private readonly categoryManageService: CategoryManageService) {}

  @Post()
  create(@Body() createCategoryManageDto: CreateCategoryManageDto) {
    return this.categoryManageService.create(createCategoryManageDto);
  }

  @Get()
  findAll() {
    return this.categoryManageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryManageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryManageDto: UpdateCategoryManageDto,
  ) {
    return this.categoryManageService.update(+id, updateCategoryManageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryManageService.remove(+id);
  }

  @Get('category/:idCategory')
  findByEventCategory(@Param('idCategory') idCategory: string) {
    return this.categoryManageService.findByEventCategory(+idCategory);
  }

  @Get('event/:idEvent')
  findByEventEntity(@Param('idEvent') idEvent: string) {
    return this.categoryManageService.findByEventEntity(+idEvent);
  }
}
