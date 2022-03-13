import { createReducer, on } from '@ngrx/store';
import { userJWTpayload } from 'src/app/models/userauth/userauth.interface';
import { removelocaldata } from 'src/app/shared/localFns/local-functions.service';
import * as LoginAction from './userlogin.action';

export interface UserAuthState {
    userinfo: userJWTpayload;
    error: any
}

const userinfo_null: userJWTpayload = {
    user_id: 0,
    user_name: "",
    user_email: "",
    user_role: "",
    access_token: ""
}

export const initialUserState: UserAuthState = {
    userinfo: userinfo_null,
    error: null
}

export const UserAuthReducer = createReducer(
    initialUserState,
    on(LoginAction.LoginSuccesful,
        (state, action) => {
            localStorage.setItem('user_id', action.userinfo.user_id.toString());
            localStorage.setItem('user_name', action.userinfo.user_name);
            localStorage.setItem('user_email', action.userinfo.user_email);
            localStorage.setItem('user_role', action.userinfo.user_role);
            localStorage.setItem('Authorization', 'Bearer ' + action.userinfo.access_token);
            localStorage.setItem('access_token', action.userinfo.access_token);
            return {
                ...state,
                userinfo: action.userinfo,
                error: null
            }
        }
    ),
    on(LoginAction.LoginFailed,
        (state, action) => {
            removelocaldata();
            return {
                ...state,
                userinfo: userinfo_null,
                error: action.error
            }

        }
    )
)