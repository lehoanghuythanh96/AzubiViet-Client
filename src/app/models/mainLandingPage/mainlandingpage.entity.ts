import { GuestQandAEntity } from "../guestQandA/guestQandA.entity";
import { NestDefaultConfig } from "../nest_defaultconfig/nestdefaultconfig.entity";
import { PostCommentEntity } from "../postComments/postcomment.entity";
import { PostEntity } from "../postentity/post.entity";

export interface MainLandingPageInfo {

    all_comments: PostCommentEntity[] | null
    all_QandA: GuestQandAEntity[] | null
    defaultconfig: NestDefaultConfig | null
    all_lessons: PostEntity[] | null
    all_questionproducts: PostEntity[] | null

}