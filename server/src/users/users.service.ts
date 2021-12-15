import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async find(userName: string) {
    const users = await this.repository.find({ userName });
    return users;
  }

  async create(userDto: CreateUserDto) {
    const user = this.repository.create({ ...userDto });
    return await this.repository.save(user);
  }
}
