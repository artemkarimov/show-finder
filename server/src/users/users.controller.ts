import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignUserInDto } from './dtos/sign-user-in.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    console.log(body);
    const user = await this.authService.signup(body);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async signUserIn(@Body() body: SignUserInDto) {
    const user = await this.authService.signin(body);
    return user;
  }
}
