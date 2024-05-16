import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './interfaces/post.interface';
import { CreatePostDTO } from './dto/create-post.dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel('Post') private readonly postModel: Model<Post>) { }

    async getPosts(): Promise<Post[]> {
        const posts = await this.postModel.find().populate('author')
        return posts;
    }

    async getPost(postID: string): Promise<Post> {
        const post = await this.postModel.findById(postID).exec();
        return post;
    }

    async getPostByAuthor(postID: string, authorID: string): Promise<Post> {
        const post = await (await this.postModel.findOne({ _id: postID, author: authorID })).populate('author')
        if (!post) throw new NotFoundException('Post does not exist or you do not have permission to access this post!');
        return post;
    }

    async getAllPostsByAuthor(authorID: string): Promise<Post[]> {
        const posts = await this.postModel.find({ author: authorID }).populate('author')
        if (!posts) throw new NotFoundException('Post does not exist or you do not have permission to access this post!');
        return posts;
    }

    async addPost(createPostDTO: CreatePostDTO): Promise<Post> {
        const newPost = new this.postModel(createPostDTO);
        return newPost.save();
    }

    async editPost(postID: string, createPostDTO: CreatePostDTO): Promise<Post> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(postID, createPostDTO, { new: true });
        return editedPost;
    }

    async deletePost(postID: string, authorID: string): Promise<any> {
        const deletedPost = await this.postModel.deleteOne({_id : postID, author: authorID})
        if(!deletedPost) throw new NotFoundException('Post does not exist or you do not have permission to access this post!');
        return deletedPost;
    }

}