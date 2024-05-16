import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
import { JwtGuard } from 'src/auth/guard';


@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) { }

    @Get('posts')
    async getPosts(@Res() res) {
        const posts = await this.blogService.getPosts();
        return res.status(HttpStatus.OK).json(posts);
    }

    @UseGuards(JwtGuard)
    @Get('post/:authorID')
    async getAllPostsByAuthor(
        @Res() res,
        @Param('authorID', new ValidateObjectId()) authorID
        ) {
        const posts = await this.blogService.getAllPostsByAuthor(authorID)
        if (!posts) throw new NotFoundException('Posts do not exist!');
        return res.status(HttpStatus.OK).json(posts);
    }

    // @Get('post/:postID')
    // async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    //     const post = await this.blogService.getPost(postID);
    //     if (!post) throw new NotFoundException('Post does not exist!');
    //     return res.status(HttpStatus.OK).json(post);
    // }

    @UseGuards(JwtGuard)
    @Get('post/:postID/:authorID')
    async getPostByAuthor(
        @Res() res,
        @Param('postID', new ValidateObjectId()) postID,
        @Param('authorID', new ValidateObjectId()) authorID
        ) {
        const post = await this.blogService.getPostByAuthor(postID, authorID)
        if (!post) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json(post);
    }

    

    @UseGuards(JwtGuard)
    @Post('/post')
    async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
        const newPost = await this.blogService.addPost(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    }

    @UseGuards(JwtGuard)
    @Put('/post')
    async editPost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreatePostDTO
    ) {
        const editedPost = await this.blogService.editPost(postID, createPostDTO);
        if (!editedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been successfully updated',
            post: editedPost
        })
    }

    @UseGuards(JwtGuard)
    @Delete('/post')
    async deletePost(
        @Res() res,
        @Query('postID', new ValidateObjectId()) postID,
        @Query('authorID', new ValidateObjectId()) authorID
    ) {
        const deletedPost = await this.blogService.deletePost(postID, authorID);
        if (!deletedPost) throw new NotFoundException('Post does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedPost
        })
    }
}