import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignUserInDto } from './dtos/sign-user-in.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(userDto: CreateUserDto) {
    const { firstName, lastName, countryId, userName, password } = userDto;
    const users = await this.usersService.find(userName);
    if (users.length) throw new BadRequestException('This user name is already used');
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = hash.toString('hex') + '.' + salt;
    const user = await this.usersService.create({
      firstName,
      lastName,
      countryId,
      userName,
      password: hashedPassword,
    });
    return user;
  }

  async signin(userDto: SignUserInDto) {
    const { userName, password } = userDto;
    const [user] = await this.usersService.find(userName);
    if (!user) throw new NotFoundException('User not found');
    const [storedHash, salt] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash) throw new BadRequestException('Invalid password');
    return user;
  }
}
