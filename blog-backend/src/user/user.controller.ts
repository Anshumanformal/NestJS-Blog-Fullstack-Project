import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidateObjectId } from 'src/blog/shared/pipes/validate-object-id.pipes';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('users')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':userID')
    async getUser(@Res() res, @Param('postID', new ValidateObjectId()) userID) {
        const user = await this.userService.getUser(userID);
        if (!user) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(user);

    }

    @Post('/user')
    async addPost(@Res() res, @Body() createPostDTO: CreateUserDTO) {
        const newPost = await this.userService.addUser(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }
}
