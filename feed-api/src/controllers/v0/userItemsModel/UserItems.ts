import {Table, Column, Model, HasMany, PrimaryKey, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';

@Table
export class UserItems extends Model<UserItems> {

  @Column
  public items_id!: string;

  @Column
  public user_id!: string; // for nullable fields
  
}