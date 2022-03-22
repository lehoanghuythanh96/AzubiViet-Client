import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { MediaListEntity } from "../media/media.entity";
import { PostEntity } from "../post/post.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
export declare class PostEntityResolver {
    private fetchDataService;
    private _questionmarketService;
    private _lessonhandlerservice;
    constructor(fetchDataService: FetchDataService, _questionmarketService: QuestionMarketService, _lessonhandlerservice: LessonHandlerService);
    lesson_avatar(PostEntity: PostEntity): Promise<MediaListEntity>;
    question_avatar(PostEntity: PostEntity): Promise<MediaListEntity>;
    question_answer(user: userJWTpayload, PostEntity: PostEntity): Promise<QuestionMarketAnswerEntity>;
    question_imgs(user: userJWTpayload, PostEntity: PostEntity): Promise<MediaListEntity[]>;
    author_info(PostEntity: PostEntity): Promise<{
        ID: number;
        user_name: string;
        user_password: string;
        user_secretcode: string;
        user_email: string;
        user_role: import("../userauthentication/userauth.entity").UserRoles;
        user_level: number;
        levelup_points: number;
        user_experience: number;
        user_abicoin: number;
        user_stat: string;
        user_avatar: MediaListEntity;
        gender: import("../userauthentication/userauth.entity").UserGenders;
        is_blocked: boolean;
        punish_point: number;
        user_private_answers: QuestionMarket_UserAnswerEntity[];
        defaultconfig: import("../defaultconfig/defaultconfig.entity").DefaultConfigEntity;
        user_inventory: import("../userinventory/userinventory.entity").UserInventoryEntity[];
    }>;
    questionmarket_user_answer(user: userJWTpayload, PostEntity: PostEntity): Promise<QuestionMarket_UserAnswerEntity[]>;
}
