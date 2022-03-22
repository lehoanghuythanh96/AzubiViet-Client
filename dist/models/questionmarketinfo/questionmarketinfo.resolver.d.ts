import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
import { UserEntity } from "../userauthentication/userauth.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { QuestionMarketInfoEntity } from "./questionmarketinfo.entity";
export declare class QuestionMarketInfoResolver {
    private readonly fetchDataService;
    private _questionMarketService;
    constructor(fetchDataService: FetchDataService, _questionMarketService: QuestionMarketService);
    questionmarketinfo(user: userJWTpayload): Promise<QuestionMarketInfoEntity[]>;
    product_tree(user: userJWTpayload): Promise<AreaListEntity[]>;
    answer_reviews(user: userJWTpayload): Promise<UserAnswerReviewEntity[]>;
    defaultconfig(): DefaultConfigEntity;
    userinfo(user: userJWTpayload): Promise<UserEntity>;
    shop_items(user: userJWTpayload): Promise<import("../ShopItem/shopitem.entity").ShopItemEntity[]>;
}