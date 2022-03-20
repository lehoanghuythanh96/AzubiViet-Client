export interface userJWTpayload {
    user_id: number;
    user_name: string;
    user_email: string;
    user_role: "subscriber" | "admin";
    access_token: string | null;
}
