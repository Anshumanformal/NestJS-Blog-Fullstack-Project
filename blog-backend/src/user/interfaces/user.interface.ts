import { Document } from "mongoose";
export interface User extends Document {
    readonly fullName: string;
    readonly age: string;
    readonly email: string;
    password: string
}
