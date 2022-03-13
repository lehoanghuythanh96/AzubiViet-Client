export interface userJWTpayload {
    user_id: number | 0;
    user_name: string | "";
    user_email: string | "";
    user_role: string | "";
    access_token: string | "";
}

export interface UserLoginInfo {
    user_email: string;
    user_password: string;
}