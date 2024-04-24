import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

export const BlogSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    body: {type: String},
    author: {type: ObjectId, ref: 'User'},
    date_posted: {type: String}
})
