import { JwtService } from '@nestjs/jwt';
import Joi = require('joi');
import { Observable } from 'rxjs';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { AddCategoryInput } from 'src/models/lessoncategory/lessoncategory.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { AddNewQuestionProducPostBody, EditQuestionProducPostBody, PostInput } from 'src/models/post/post.interface';
import { QuestionMarketAnswerEntity } from 'src/models/questionmarketanswer/questionmarketanswer.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { QuestionProductCategoryEntity } from 'src/models/questionproductcategory/questionproductcategory.entity';
import { ReportLoggerEntity } from 'src/models/reportLogger/reportlogger.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserEntity } from 'src/models/userauthentication/userauth.entity';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { QuestionMarketService } from './question-market.service';
export declare class QuestionMarketController {
}
export declare class AddQuestionProductCategoryController {
    private readonly QuestionProductCategoryRepository;
    private readonly CacheManager;
    constructor(QuestionProductCategoryRepository: Repository<QuestionProductCategoryEntity>, CacheManager: AppCache);
    uploadschema: Joi.ObjectSchema<any>;
    addquestionproductcategory(req: JwtAuthGuardReq, body: AddCategoryInput): Promise<{
        category_name: string;
        area_ID: number;
        user_ID: number;
    } & QuestionProductCategoryEntity>;
}
export declare class UploadQuestionProductImageByFileController {
    private basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionproductimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadQuestionProductImageByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionproductimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class UploadQuestionProductAnswerImageByFileController {
    private basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionproductanswerimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadQuestionProductAnswerImageByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionproductanswerimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class DeleteTempQuestionProductImageController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache);
    deletetemporaryquestionproductimg(req: JwtAuthGuardReq, body: {
        img_name: string;
    }): Promise<import("typeorm").DeleteResult>;
}
export declare class DeleteTempQuestionUserAnswerImageController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache);
    deletetemporaryquestionuseranswerimg(req: JwtAuthGuardReq, body: {
        img_name: string;
    }): Promise<import("typeorm").DeleteResult>;
}
export declare class CreateNewQuestionProductController {
    private readonly questionmarketanswerRepository;
    private readonly postrepository;
    private readonly mediarepository;
    private readonly cacheManager;
    constructor(questionmarketanswerRepository: Repository<QuestionMarketAnswerEntity>, postrepository: Repository<PostEntity>, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache);
    uploadschema: Joi.ObjectSchema<any>;
    createnewquestionproduct(req: JwtAuthGuardReq, body: AddNewQuestionProducPostBody): Promise<PostInput & PostEntity>;
}
export declare class EditPrivateQuestionProductController {
    private readonly postrepository;
    private readonly mediarepository;
    private readonly questionmarketanswerRepository;
    private readonly useranswerreviewrepository;
    private readonly cacheManager;
    constructor(postrepository: Repository<PostEntity>, mediarepository: Repository<MediaListEntity>, questionmarketanswerRepository: Repository<QuestionMarketAnswerEntity>, useranswerreviewrepository: Repository<UserAnswerReviewEntity>, cacheManager: AppCache);
    uploadschema: Joi.ObjectSchema<any>;
    editprivatequestionproduct(req: JwtAuthGuardReq, body: EditQuestionProducPostBody): Promise<import("typeorm").UpdateResult>;
}
export declare class UserRequiredReviewUpdateController {
    private _questionmarketService;
    private _userAnswerReviewRepository;
    private readonly cacheManager;
    constructor(_questionmarketService: QuestionMarketService, _userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, cacheManager: AppCache);
    userrequiredreviewupdate(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<import("typeorm").UpdateResult>;
}
export declare class UserRequireMakingReviewFixedController {
    private _questionmarketService;
    constructor(_questionmarketService: QuestionMarketService);
    userrequiremakingreviewfixed(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<import("typeorm").UpdateResult>;
}
export declare class UserRequireSkipReviewUpdate {
    private _questionmarketService;
    constructor(_questionmarketService: QuestionMarketService);
    userrequiremakingreviewupdated(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<import("typeorm").UpdateResult>;
}
export declare class UploadQuestionProductAvatarByImgFileController {
    private basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionproductavatarbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadQuestionProductAvatarByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionproductavatarbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class UploadQuestionMarketUserAnswerImageByFileController {
    private basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionmarketuseranswerimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadQuestionMarketUserAnswerImageByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadquestionmarketuseranswerimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class UsersubmitQuestionAnswerController {
    private questionMarketService;
    constructor(questionMarketService: QuestionMarketService);
    uploadschema: Joi.ObjectSchema<any>;
    usersubmitquestionanswer(req: JwtAuthGuardReq, body: {
        answer_content: string;
        answer_imgs: string[];
        question_ID: number;
    }): Promise<number[]>;
}
export declare class GetReviewQuestionAnswerController {
    private questionMarketService;
    private userService;
    private jwt;
    private notificationRepository;
    private userAnswerRepository;
    private userPrivateMessageRepository;
    private readonly cacheManager;
    constructor(questionMarketService: QuestionMarketService, userService: UserAuthenticationService, jwt: JwtService, notificationRepository: Repository<UserNotificationEntity>, userAnswerRepository: Repository<QuestionMarket_UserAnswerEntity>, userPrivateMessageRepository: Repository<UserPrivateMessageEntity>, cacheManager: AppCache);
    getreviewquestionanswer(body: {
        token: string;
    }): Promise<(number | {
        ID: number;
        answer_content: string;
        parent_ID: number;
        user_ID: number;
        answer_imgs: MediaListEntity[];
    })[]>;
}
export declare class UserSubmitAnswerReviewController {
    private _questionmarketService;
    private _userauthService;
    private userNotificationRepository;
    private readonly cacheManager;
    private userRepository;
    private userAnswerReviewRepository;
    private questionMarketUserAnswerRepository;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, userNotificationRepository: Repository<UserNotificationEntity>, cacheManager: AppCache, userRepository: Repository<UserEntity>, userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, questionMarketUserAnswerRepository: Repository<QuestionMarket_UserAnswerEntity>);
    uploadschema: Joi.ObjectSchema<any>;
    usersubmitanswerreview(req: JwtAuthGuardReq, body: {
        correctness: boolean;
        review_content: string;
        notification_ID: number;
    }): Promise<{
        selectedUsers: number[];
        reviewer_increased_money: number;
    }>;
}
export declare class UserConfirmReviewController {
    private _questionmarketService;
    private _userauthService;
    private _userAnswerReviewRepository;
    private readonly cacheManager;
    private readonly userRepository;
    private readonly userNotificationRepository;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, _userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, cacheManager: AppCache, userRepository: Repository<UserEntity>, userNotificationRepository: Repository<UserNotificationEntity>);
    userconfirmreview(body: {
        review_ID: number;
        isLiked: boolean;
        notification_ID: number;
    }): Promise<number>;
}
export declare class useranswer_reportedReviewerRequireOriginalAnswerController {
    private _questionmarketService;
    private _userauthService;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService);
    useranswer_reportedReviewerRequireOriginalAnswer(req: JwtAuthGuardReq, body: {
        user_answer_ID: number;
    }): Promise<QuestionMarketAnswerEntity>;
}
export declare class ReportedQuestionAuthorRequiredDataController {
    private _questionmarketService;
    constructor(_questionmarketService: QuestionMarketService);
    reportedquestion_authorrequiredata(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<PostEntity>;
}
export declare class SendPrivateMessageToQuestionAuthorController {
    private _questionmarketService;
    private userAuthService;
    constructor(_questionmarketService: QuestionMarketService, userAuthService: UserAuthenticationService);
    sendprivatemessagetoquestionauthor(req: JwtAuthGuardReq, body: {
        question_ID: number;
        message_content: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class UserConfirmClearAnswerReportController {
    private _questionmarketService;
    constructor(_questionmarketService: QuestionMarketService);
    userconfirmclearanswerreport(req: JwtAuthGuardReq, body: {
        user_answer_ID: number;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class UserReportExpiredAnswerController {
    private _questionmarketService;
    private _userauthService;
    private reportLoggerRepository;
    private readonly cacheManager;
    private readonly userRepository;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, reportLoggerRepository: Repository<ReportLoggerEntity>, cacheManager: AppCache, userRepository: Repository<UserEntity>);
    userreportexpiredanswer(req: JwtAuthGuardReq, body: {
        user_answer_ID: number;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class UserDeleteSingleQuestionProductController {
    private _questionmarketService;
    private _userauthService;
    private _fetchdataService;
    private postRepository;
    private readonly cacheManager;
    private readonly mediaListRepository;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, _fetchdataService: FetchDataService, postRepository: Repository<PostEntity>, cacheManager: AppCache, mediaListRepository: Repository<MediaListEntity>);
    userdeletesinglequestionproduct(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<void>;
}
