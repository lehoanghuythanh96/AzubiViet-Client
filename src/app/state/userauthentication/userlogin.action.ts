import { createAction, props } from '@ngrx/store';
import { userJWTpayload, UserLoginInfo } from 'src/app/models/userauth/userauth.interface';

export const LoginReaction = createAction(
    '[UserLoginComponent] User is logging in',
    props<{userlogininfo: UserLoginInfo;}>()
)

export const LoginSuccesful = createAction(
    '[UserLogin Effect] User logged in successfully',
    props<{userinfo: userJWTpayload}>()
)

export const LoginFailed = createAction(
    '[UserLogin Effect] User login action failed',
    props<{error: any}>()
)