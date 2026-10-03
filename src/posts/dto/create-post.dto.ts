import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Не может быть пустым' })
  readonly title: string;
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Не может быть пустым' })
  readonly content: string;
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  readonly userId: number;
}