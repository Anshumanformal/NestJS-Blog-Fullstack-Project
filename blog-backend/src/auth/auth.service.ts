import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwt: JwtService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDTO) {
        try {
            const findUserInDB = await this.userService.findOneByEmail(dto.email);
            if(findUserInDB)
                throw new BadRequestException('Email already exists');

            const hash = await argon.hash(dto.password);
            const user = await this.userService.createUser({
                fullName: dto.fullName,
                age: dto.age,
                email: dto.email,
                password: hash
            });

            return user;

        } catch (error) {
            throw new BadRequestException("User details already present")
        }
    }

    async signin(dto: AuthDTO) {
        const user = await this.userService.findOneByEmail(dto.email);
        if (!user)
            throw new ForbiddenException('User with the given email was not found');
        const pwMatches = await argon.verify(user.password, dto.password);
        if (!pwMatches)
            throw new ForbiddenException('Password incorrect');
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };

        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
            expiresIn: this.config.get('JWT_ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC'),
            secret,
        });

        return {
            access_token: token,
        };
    }
}
