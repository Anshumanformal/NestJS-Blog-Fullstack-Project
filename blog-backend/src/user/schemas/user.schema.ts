import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    fullName: {type: String},
    age: {type: String},
    email: {type: String},
    password: {type: String},
})