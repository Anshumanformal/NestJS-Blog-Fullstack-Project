import { ObjectId } from "mongoose";

export class CreatePostDTO {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: ObjectId;
    readonly date_posted: string
}