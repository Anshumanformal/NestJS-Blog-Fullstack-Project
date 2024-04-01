import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    body: {type: String},
    author: {type: String},
    date_posted: {type: String}
})