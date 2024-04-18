import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor( private config: ConfigService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {sub: string, email: string}) {
    // const user = await this.userService.findOneByID(payload.sub) // Both will work as both _id and email are unique identifier
    const user = await this.userService.findOneByEmail(payload.email) // Both will work as both _id and email are unique identifier
    delete user.password
    return user
  }
}

