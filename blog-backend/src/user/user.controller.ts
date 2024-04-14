import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidateObjectId } from 'src/blog/shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('users')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @UseGuards(JwtGuard)
    @Get(':userID')
    async getUser(@Res() res, @Param('userID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(user);
    }

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Post('/user')
    async addPost(@Res() res, @Body() createPostDTO: CreateUserDTO) {
        const newPost = await this.userService.createUser(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }
}
