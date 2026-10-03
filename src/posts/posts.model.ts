import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import type { Wrapper } from '../common/types/wrapper.type';

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор на внешний ключ User',
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @ApiProperty({ example: 'Машина', description: 'Название поста' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Новая машина от нового бренда',
    description: 'Контент',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @ApiProperty({
    example: 'Картинка поста',
    description: 'Картинка для поста',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @BelongsTo(() => User)
  author: Wrapper<User>;
}