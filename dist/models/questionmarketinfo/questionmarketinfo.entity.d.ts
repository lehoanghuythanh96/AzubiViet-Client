import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { ShopItemEntity } from "../ShopItem/shopitem.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
export declare class QuestionMarketInfoEntity {
    ID: number;
    product_tree: [AreaListEntity];
    defaultconfig: DefaultConfigEntity;
    answer_reviews: UserAnswerReviewEntity[];
    shop_items: ShopItemEntity[];
}
