import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
}

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext): any {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}

export interface JwtAuthGuardReq {
    user: userJWTpayload
}
