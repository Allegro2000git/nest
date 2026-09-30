import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Почта пользователя' })
  readonly email: string;
  @ApiProperty({ example: '123', description: 'Пароль пользователя' })
  readonly password: string;
}