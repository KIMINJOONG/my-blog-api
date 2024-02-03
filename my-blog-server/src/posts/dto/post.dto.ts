import { Category } from 'src/categories/category.entity';

export class PostDto {
  id: number;
  title: string;
  content?: string;
  view: number;
  thumbnail: string;
  categoryId: number;
  category: Category;
  createdAt: string;
}
