import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GetUser } from './auth/decorators/index';
import { User } from './user/interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user')
  async getHello(@GetUser() user: User) {
    // return this.appService.getHello();
    return user;
  }
}
