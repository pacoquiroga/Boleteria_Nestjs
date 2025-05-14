import { Injectable } from '@nestjs/common';
import { CreateCategoryManageDto } from './dto/create-categoryManage.dto';
import { UpdateCategoryManageDto } from './dto/update-categoryManage.dto';

@Injectable()
export class CategoryManageService {
  create(createCategoryManageDto: CreateCategoryManageDto) {
    return 'This action adds a new categoryManage';
  }

  findAll() {
    return `This action returns all categoryManage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryManage`;
  }

  update(id: number, updateCategoryManageDto: UpdateCategoryManageDto) {
    return `This action updates a #${id} categoryManage`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryManage`;
  }
}
