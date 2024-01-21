import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAll(): Promise<Category[]> {
    return this.categoriesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.getOne(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.categoriesService.deleteOne(id);
  }

  @Post()
  create(@Body() boardData: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(boardData);
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() updateData: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateData);
  }
}
