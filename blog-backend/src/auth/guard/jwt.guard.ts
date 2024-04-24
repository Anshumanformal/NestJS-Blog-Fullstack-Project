import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
    constructor() {
        super()
    }

    canActivate(context: ExecutionContext) {
        // Put your custom logic here, for example, checking the token blacklist, etc.
        return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {
        if (err || !user) {
          // Token is invalid or not provided
          throw err || new UnauthorizedException();
        }
        // Token is valid, return the user
        return user;
      }
}