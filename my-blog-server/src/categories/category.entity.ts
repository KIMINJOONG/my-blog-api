import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/post.entity';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    comment: '제목',
  })
  name!: string;

  @HasMany(() => Post)
  posts?: Post[];
}
