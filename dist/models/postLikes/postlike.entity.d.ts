export declare class PostLikeEntity {
    ID: number;
    type: PostLikeTypes;
    parent_ID: number;
    user_array: number[];
}
export interface PostLikeInput {
    type: PostLikeTypes;
    parent_ID: number;
    user_array: number[];
}
export declare enum PostLikeTypes {
    QA_Answer = "QA_Answer"
}
