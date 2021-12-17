import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async find(object: Partial<User>) {
    const users = await this.repository.find(object);
    return users;
  }

  async findOne(id: number) {
    if (!id) return null;
    const user = await this.repository.findOne(id);
    return user;
  }

  async create(userDto: CreateUserDto) {
    const user = this.repository.create({ ...userDto });
    return await this.repository.save(user);
  }
}
