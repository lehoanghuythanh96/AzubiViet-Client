import { JwtService } from '@nestjs/jwt';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { FetchDataService } from '../fetch-data/fetch-data.service';
export declare class QuestionMarketService {
    private fetchDataService;
    private jwt;
    constructor(fetchDataService: FetchDataService, jwt: JwtService);
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
