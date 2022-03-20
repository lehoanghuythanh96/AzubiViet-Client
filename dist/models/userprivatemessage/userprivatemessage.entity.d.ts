export declare class UserPrivateMessageEntity {
    ID: number;
    message_content: string;
    message_date: Date;
    sender_email: string;
    sender_ID: number;
    user_ID: number;
}
export interface UserPrivateMessageInput {
    message_content: string;
    sender_email: string;
    sender_ID: number;
    user_ID: number;
}
