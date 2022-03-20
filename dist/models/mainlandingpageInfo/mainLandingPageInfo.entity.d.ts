import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { GuestQAndAEntity } from "../GuestQAndA/GuestQAndA.entity";
import { PostEntity } from "../post/post.entity";
import { PostCommentEntity } from "../postComment/postComment.entity";
export declare class MainLandingPageEntity {
    ID: number;
    all_comments: PostCommentEntity[];
    all_QandA: GuestQAndAEntity[];
    defaultconfig: DefaultConfigEntity;
    all_lessons: PostEntity[];
    all_questionproducts: PostEntity[];
}
