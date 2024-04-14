import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: {type: String},
    fullname: {type: String},
    age: {type: String},
    email: {type: String},
    password: {type: String},
})