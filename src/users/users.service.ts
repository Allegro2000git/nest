import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async getAllUser() {
    return await this.userRepository.findAll();
  }
}
