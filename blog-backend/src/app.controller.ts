import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { GetUser } from './auth/decorators/index';
import { User } from './user/interfaces/user.interface';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('user')
  // async getHello(@GetUser() user: User) {
  //   // return this.appService.getHello();
  //   return user;
  // }

  @Get('/')
  async healthCheck(@Res() res: Response){
    return res.status(HttpStatus.OK).json("Server running OK on port 5000")
  }
}
