import { Document, ObjectId } from "mongoose";
export interface Post extends Document {
    readonly title: string;
    readonly description: string;
    readonly body: string;
    readonly author: ObjectId;
    readonly date_posted: string
}
