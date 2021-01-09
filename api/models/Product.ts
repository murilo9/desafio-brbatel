import {
  Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt,
} from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  currentStock: number;

  @Column
  minStock: number;

  @Column
  cost: number;

  @Column
  price: number;

  @CreatedAt
  created: Date

  @UpdatedAt
  updated: Date

  @DeletedAt
  deleted: Date
}
