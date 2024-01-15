import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: number;

  @Column
  token: string;

  @Column
  tokenExp: string;
}
