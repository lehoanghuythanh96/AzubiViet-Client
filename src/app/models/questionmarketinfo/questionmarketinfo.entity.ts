import { AreaListEntity } from "../lessoninfo/lessoninfo.interface";
import { NestDefaultConfig } from "../nest_defaultconfig/nestdefaultconfig.entity";
import { ShopItemEntity } from "../shopitem/shopitem.entity";
import { UserAnswerReviewEntity } from "../userAnswerReview/useranswerreview.entity";
import { UserEntity } from "../userentity/userinfo.entity";

export interface QuestionMarketInfo {
    product_tree: [AreaListEntity] | null,
    defaultconfig: NestDefaultConfig | null,
    userinfo: UserEntity | null,
    answer_reviews: [UserAnswerReviewEntity] | null,
    shop_items: ShopItemEntity[] | null,
}