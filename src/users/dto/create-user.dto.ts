import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Почта пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({},{message: 'Некорректный email'})
  readonly email: string;
  @ApiProperty({ example: '123', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 20, {message: 'Не меньше 4 и не больше 20 символов'})
  readonly password: string;
}