import { postTypes } from "../post/post.entity";
export declare class PostCommentEntity {
    ID: number;
    comment_content: string;
    user_id: string;
    comment_date: Date;
    parent_ID: string;
    post_type: postTypes;
    liked_users: number[];
    comment_status: "trash" | "publish";
}
export interface PostCommentInput {
    comment_content: string;
    user_id: number;
    parent_ID: number;
    post_type: postTypes;
}
