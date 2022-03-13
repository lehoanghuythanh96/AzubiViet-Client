export interface UserNotification {
    ID: number,
    type: "user_answer",
    data: any,
    secret: any,
    user_IDs: number[],
    deletion_allowed: number[]
}