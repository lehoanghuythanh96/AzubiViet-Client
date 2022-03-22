import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { UserInventoryEntity } from "../userinventory/userinventory.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserEntity } from "./userauth.entity";
export declare class UserEntityResolver {
    private questionmarketService;
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
    user_info(user: userJWTpayload): Promise<UserEntity>;
    user_avatar(user: userJWTpayload, UserEntity: UserEntity): Promise<MediaListEntity>;
    user_private_answers(user: userJWTpayload, UserEntity: UserEntity): Promise<QuestionMarket_UserAnswerEntity[]>;
    user_level(user: userJWTpayload, UserEntity: UserEntity): Promise<number>;
    defaultconfig(): DefaultConfigEntity;
    levelup_points(user: userJWTpayload, UserEntity: UserEntity): Promise<number>;
    user_inventory(user: userJWTpayload, UserEntity: UserEntity): Promise<UserInventoryEntity[]>;
}
