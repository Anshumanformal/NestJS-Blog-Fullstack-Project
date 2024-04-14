import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
    @IsString()
    @IsNotEmpty()
    fullName: string;
    @IsString()
    @IsNotEmpty()
    age: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string
}