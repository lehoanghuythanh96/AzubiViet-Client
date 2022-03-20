import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { Repository } from "typeorm";
import { AppCache } from "../cacheKeys/cacheKeys.entity";
import { MediaListEntity } from "../media/media.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity } from "../usernotifications/usernotifications.entity";
import { QuestionMarket_UserAnswerEntity } from "./questionmarket_useranswer.entity";
export declare class QuestionMarket_UserAnswerResolver {
    private questionmarketService;
    private mediaListRepository;
    private readonly cacheManager;
    private useranswerRepository;
    private useranswerReviewRepository;
    private usernotificationRepository;
    private userAuthService;
    constructor(questionmarketService: QuestionMarketService, mediaListRepository: Repository<MediaListEntity>, cacheManager: AppCache, useranswerRepository: Repository<QuestionMarket_UserAnswerEntity>, useranswerReviewRepository: Repository<UserAnswerReviewEntity>, usernotificationRepository: Repository<UserNotificationEntity>, userAuthService: UserAuthenticationService);
    answer_imgs(user: userJWTpayload, QuestionMarket_UserAnswerEntity: QuestionMarket_UserAnswerEntity): Promise<MediaListEntity[]>;
    answer_is_outdated(user: userJWTpayload, QuestionMarket_UserAnswerEntity: QuestionMarket_UserAnswerEntity): Promise<boolean>;
    delete_single_user_answer(user: userJWTpayload, answer_ID: number): Promise<{
        selectedUsers: number[];
    }>;
}
