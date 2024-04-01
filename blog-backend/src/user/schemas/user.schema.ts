import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    fullname: {type: String},
    age: {type: String}
})