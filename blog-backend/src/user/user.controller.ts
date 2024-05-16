import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidateObjectId } from 'src/blog/shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { User } from './interfaces/user.interface';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get(':userEmail')
    async getUserByEmail(@Res() res: Response, @Param('userEmail') userEmail) {
        const user = await this.userService.getUserByEmail(userEmail);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(JwtGuard)
    @Get('users')
    async getUsers(@Res() res: Response) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @UseGuards(JwtGuard)
    @Get(':userID')
    async getUser(@Res() res: Response, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('User does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(JwtGuard)
    @Get('me')
    async getMe(@GetUser() user: User) {
        return user;
    }

}
