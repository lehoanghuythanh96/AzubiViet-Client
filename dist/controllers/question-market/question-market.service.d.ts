import { JwtService } from '@nestjs/jwt';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
export declare class QuestionMarketService {
    private basictools;
    private userAuthService;
    private readonly mediarepository;
    private cacheManager;
    private readonly questionanswerrepository;
    private readonly questionproductcategoryRepository;
    private postrepository;
    private readonly questionmarketuseranswerRepository;
    private readonly userAnswerReviewRepository;
    private readonly userNotificationRepository;
    private readonly userInventoryRepository;
    private fetchDataService;
    private jwt;
    constructor(basictools: BasicToolsService, userAuthService: UserAuthenticationService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache, questionanswerrepository: Repository<QuestionMarketAnswerEntity>, questionproductcategoryRepository: Repository<QuestionProductCategoryEntity>, postrepository: Repository<PostEntity>, questionmarketuseranswerRepository: Repository<QuestionMarket_UserAnswerEntity>, userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, userNotificationRepository: Repository<UserNotificationEntity>, userInventoryRepository: Repository<UserInventoryEntity>, fetchDataService: FetchDataService, jwt: JwtService);
    getallquestionanswer(): Promise<QuestionMarketAnswerEntity[]>;
    getallquestionanswerIMG(): Promise<MediaListEntity[]>;
    getallquestionIMG(): Promise<MediaListEntity[]>;
    getalluseranswerIMG(): Promise<MediaListEntity[]>;
    getusertempmediafiles: (user: userJWTpayload) => Promise<unknown>;
    getall_questionproduct(): Promise<PostEntity[]>;
    getallquestionproductavatar(): Promise<MediaListEntity[]>;
    getalluseranswerinmarket(): Promise<QuestionMarket_UserAnswerEntity[]>;
    getall_questionproductcategory(): Promise<QuestionProductCategoryEntity[]>;
    getAllUserAnswerReviews(): Promise<UserAnswerReviewEntity[]>;
    resetReporteduserAnswer(user_answer_ID: number): Promise<void>;
    updateAllPrivateReviewsInfo(user: userJWTpayload, question_ID: number, new_question_input: Partial<PostEntity>, new_answer_input: Partial<QuestionMarketAnswerEntity>, question_avatar: MediaListEntity, question_imgs: MediaListEntity[], answer_imgs: MediaListEntity[]): Promise<import("typeorm").UpdateResult>;
    makeReviewFixed(question_ID: number, user: userJWTpayload): Promise<import("typeorm").UpdateResult>;
    makeReviewSkippingUpdate(question_ID: number, user: userJWTpayload): Promise<import("typeorm").UpdateResult>;
    deleteSingleUserAnswerByID(answer_ID: number, user_id: number): Promise<{
        selectedUsers: number[];
    }>;
    countAnswerPunishPoint(user_answer_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countUserAnswer_ReporterPunishPoints(user_answer_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    userSubmitNewQuestionAnswer(answer_content: string, answer_imgs: string[], question_ID: number, user_id: number, neworreapeat: boolean, user_answer_ID?: number): Promise<number[]>;
    countAnswerReviewPunishPoint(user_answer_review_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countUserAnswerReview_ReporterPunishPoints(user_answer_review_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countQuestionPunishPoint(question_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    countQuestion_ReporterPunishPoints(question_ID: number, controller_ID: number, noti_ID: number): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
    userconfirmClearAnswerReport(user: userJWTpayload, user_answer_ID: number): Promise<{
        selectedUsers: number[];
    }>;
}
