import { ExecutionContext } from '@nestjs/common';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
declare const GqlJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GqlJwtAuthGuard extends GqlJwtAuthGuard_base {
    getRequest(context: ExecutionContext): any;
}
export interface JwtAuthGuardReq {
    user: userJWTpayload;
}
export {};
