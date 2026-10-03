import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesAuthGuard } from '../auth/guards/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard) // декоратор использования защищенных энпоинтов в зависимости от роли пользователя
  @Get()
  getAll() {
    return this.usersService.getAllUser();
  }

  @ApiOperation({ summary: 'Выдача ролей' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post('/ban')
  banUser(@Body() addBanUserDto: BanUserDto) {
    return this.usersService.banUser(addBanUserDto);
  }
}
