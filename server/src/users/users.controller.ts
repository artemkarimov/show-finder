import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignUserInDto } from './dtos/sign-user-in.dto';
import { User } from './entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('users')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('current-user')
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signin')
  async signUserIn(@Body() body: SignUserInDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  async signUserOut(@Session() session: any) {
    session.userId = null;
  }
}
