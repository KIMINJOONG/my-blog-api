import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table({
  charset: 'utf8mb4', // 한글에 이모티콘까지 가능
  collate: 'utf8mb4_general_ci',
})
export class Post extends Model {
  @Column({
    type: DataType.STRING,
    comment: '제목',
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    comment: '내용',
  })
  content!: string;

  // @ForeignKey(() => Category)
  // @Column
  // categoryId!: number;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
    comment: '조회수',
  })
  view!: number;

  // @BelongsTo(() => Category)
  // category?: Category;
}
