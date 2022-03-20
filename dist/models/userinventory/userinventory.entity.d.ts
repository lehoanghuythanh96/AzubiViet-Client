export declare class UserInventoryEntity {
    ID: number;
    item_quantity: number;
    item_name: string;
    item_code: string;
    user_ID: number;
    item_avatar: string;
    item_description: string;
}
export interface UserInventoryInput {
    item_quantity: number;
    item_code: string;
    user_ID: number;
}
