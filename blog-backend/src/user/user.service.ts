import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface'
import { CreateUserDTO } from './dto/create-user.dto'

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({email: email}).exec();
        return user;
    }

    async findOneByID(id: string): Promise<User> {
        const user = await this.userModel.findOne({id: id}).exec();
        return user;
    }

    async getUser(userID): Promise<User> {
        const user = await this.userModel.findById(userID).exec();
        return user;
    }

    async createUser(createPostDTO: CreateUserDTO): Promise<User> {
        const newPost = new this.userModel(createPostDTO);
        return newPost.save();
    }
}
