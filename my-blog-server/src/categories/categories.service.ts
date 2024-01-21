import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  async getAll(): Promise<Category[]> {
    const boards = await Category.findAll();
    return boards;
  }

  async getOne(id: number): Promise<Category> {
    try {
      const category: Category = await Category.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(
          `category with ID ${category.id} not found.`,
        );
      }
      return category;
    } catch (error) {}
  }

  async deleteOne(categorySeq: number): Promise<Category> {
    try {
      const category: Category = await this.getOne(categorySeq);
      await category.destroy();
      return category;
    } catch (error) {}
  }

  async create(categoryData: CreateCategoryDto): Promise<Category> {
    try {
      const category: Category = await Category.create({ ...categoryData });
      await category.save();
      return category;
    } catch (error) {
      return;
    }
  }

  async update(seq: number, updateData: UpdateCategoryDto): Promise<Category> {
    try {
      const category: Category = await this.getOne(seq);
      category.name = updateData.name;
      await category.save();
      return category;
    } catch (error) {}
  }
}
