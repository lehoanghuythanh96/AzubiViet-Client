import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { Repository } from "typeorm";
import { AppCache } from "../cacheKeys/cacheKeys.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { LevelTableEntity } from "../leveltable/leveltable.entity";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { ReportLoggerEntity } from "../reportLogger/reportlogger.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
import { UserInventoryEntity } from "../userinventory/userinventory.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity } from "../usernotifications/usernotifications.entity";
import { UserEntity } from "./userauth.entity";
export declare class UserEntityResolver {
    private _userSevice;
    private questionmarketService;
    private leveltableRepository;
    private userAnswerRepository;
    private cacheManager;
    private userNotificationRepository;
    private reportLoggerRepository;
    private userAnswerReviewRepository;
    private fetchDataService;
    constructor(_userSevice: UserAuthenticationService, questionmarketService: QuestionMarketService, leveltableRepository: Repository<LevelTableEntity>, userAnswerRepository: Repository<QuestionMarket_UserAnswerEntity>, cacheManager: AppCache, userNotificationRepository: Repository<UserNotificationEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>, userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, fetchDataService: FetchDataService);
    user_info(user: userJWTpayload): Promise<UserEntity>;
    user_avatar(user: userJWTpayload, UserEntity: UserEntity): Promise<MediaListEntity>;
    user_private_answers(user: userJWTpayload, UserEntity: UserEntity): Promise<QuestionMarket_UserAnswerEntity[]>;
    user_level(user: userJWTpayload, UserEntity: UserEntity): Promise<number>;
    defaultconfig(): DefaultConfigEntity;
    levelup_points(user: userJWTpayload, UserEntity: UserEntity): Promise<number>;
    user_inventory(user: userJWTpayload, UserEntity: UserEntity): Promise<UserInventoryEntity[]>;
}
