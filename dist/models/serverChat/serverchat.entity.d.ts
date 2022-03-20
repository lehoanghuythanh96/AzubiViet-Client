export declare class ServerChatEntity {
    ID: number;
    message_content: string;
    message_date: Date;
    server_name: ChatServerNames;
    user_ID: number;
    user_email: string;
    user_name: string;
}
export interface ServerChatInput {
    message_content: string;
    server_name: ChatServerNames;
    user_ID: number;
    user_email: string;
    user_name: string;
}
export declare enum ChatServerNames {
    justDoIt = "Just Do It",
    workHardPlayHard = "Work Hard Play Hard",
    beYourSelf = "Be Your Self",
    nothingMatters = "Nothing Matters"
}
