export declare class BlackListEntity {
    ID: number;
    type: BlackListTypes;
    user_ID: number;
    black_list: number[];
}
export interface BlackListInput {
    type: BlackListTypes;
    user_ID: number;
    black_list: number[];
}
export declare enum BlackListTypes {
    userPrivateMessage = "userPrivateMessage"
}
