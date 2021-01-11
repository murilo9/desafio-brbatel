import {
  Table, Column, Model, CreatedAt, UpdatedAt, DeletedAt, DataType,
} from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  currentStock: number;

  @Column
  minStock: number;

  @Column({
    type: DataType.DOUBLE,
  })
  cost: number;

  @Column({
    type: DataType.DOUBLE,
  })
  price: number;

  @CreatedAt
  created: Date

  @UpdatedAt
  updated: Date

  @DeletedAt
  deleted: Date
}
