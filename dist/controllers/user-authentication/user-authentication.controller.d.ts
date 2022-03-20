import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { GGLoginauthBody } from 'src/models/login/logininfo.interface';
import { UserEntity, UserGenders } from 'src/models/userauthentication/userauth.entity';
import { userJWTpayload } from 'src/models/userJWTpayload/userJWTpayload.interface';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { UserAuthenticationService } from './user-authentication.service';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { Repository } from 'typeorm';
import { QuestionMarketService } from '../question-market/question-market.service';
import { UserAnswerReviewEntity } from 'src/models/useranswer_review/useranswer_review.entity';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { ReportLoggerEntity } from 'src/models/reportLogger/reportlogger.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/models/QuestionMarket_UserAnswer/questionmarket_useranswer.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { BlackListEntity } from 'src/models/blacklist/blacklist.entity';
import { UserPrivateMessageEntity } from 'src/models/userprivatemessage/userprivatemessage.entity';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import Joi = require('joi');
export declare class UserAuthenticationController {
}
export declare class userGGloginController {
    private basictools;
    private _userauth;
    private jwt;
    private cacheManager;
    private userRepository;
    constructor(basictools: BasicToolsService, _userauth: UserAuthenticationService, jwt: JwtService, cacheManager: AppCache, userRepository: Repository<UserEntity>);
    userAuthGoogle(GGauthBody: GGLoginauthBody): Promise<userJWTpayload | BadRequestException>;
}
export declare class NewUserRegisterController {
    private basictools;
    private jwt;
    private authService;
    private cacheManager;
    constructor(basictools: BasicToolsService, jwt: JwtService, authService: UserAuthenticationService, cacheManager: AppCache);
    newuserregister(body: {
        user_email: string;
        user_password: string;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
export declare class UserLoginController {
    private basictools;
    private jwt;
    private authService;
    constructor(basictools: BasicToolsService, jwt: JwtService, authService: UserAuthenticationService);
    userlogin(body: {
        user_email: string;
        user_password: string;
    }): Promise<userJWTpayload>;
}
export declare class ConfirmUserController {
    private jwt;
    private _authService;
    private cacheManager;
    private userRepository;
    constructor(jwt: JwtService, _authService: UserAuthenticationService, cacheManager: AppCache, userRepository: Repository<UserEntity>);
    confirmuser(query: {
        secretkey: string;
    }): Promise<string>;
}
export declare class ReportUserAnswerReviewInvalidControllerInvalidController {
    private questionmarketService;
    private _userSevice;
    private cacheManager;
    private userAnswerReviewRepository;
    private userNotificationRepository;
    private reportLoggerRepository;
    constructor(questionmarketService: QuestionMarketService, _userSevice: UserAuthenticationService, cacheManager: AppCache, userAnswerReviewRepository: Repository<UserAnswerReviewEntity>, userNotificationRepository: Repository<UserNotificationEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>);
    report_user_answer_review_invalid(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        user_answer_review_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidAnswerReviewController {
    private questionmarketService;
    private _userSevice;
    private userNotificationRepository;
    private cacheManager;
    constructor(questionmarketService: QuestionMarketService, _userSevice: UserAuthenticationService, userNotificationRepository: Repository<UserNotificationEntity>, cacheManager: AppCache);
    confirm_report_invalid_answer_review(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        user_answer_review_ID: number;
        report_result: boolean;
    }): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
}
export declare class ReportUserAnswerReviewInvalidController {
    private questionmarketService;
    private _userSevice;
    private cacheManager;
    private userAnswerRepository;
    private userNotificationRepository;
    private reportLoggerRepository;
    constructor(questionmarketService: QuestionMarketService, _userSevice: UserAuthenticationService, cacheManager: AppCache, userAnswerRepository: Repository<QuestionMarket_UserAnswerEntity>, userNotificationRepository: Repository<UserNotificationEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>);
    report_user_answer_invalid(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        user_answer_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidAnswerController {
    private questionmarketService;
    private _userSevice;
    private userNotificationRepository;
    private cacheManager;
    constructor(questionmarketService: QuestionMarketService, _userSevice: UserAuthenticationService, userNotificationRepository: Repository<UserNotificationEntity>, cacheManager: AppCache);
    confirm_report_invalid_answer(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        user_answer_ID: number;
        report_result: boolean;
    }): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
}
export declare class ReportInvalidQuestionController {
    private questionmarketService;
    private _userSevice;
    private cacheManager;
    private userNotificationRepository;
    private reportLoggerRepository;
    private postRepository;
    constructor(questionmarketService: QuestionMarketService, _userSevice: UserAuthenticationService, cacheManager: AppCache, userNotificationRepository: Repository<UserNotificationEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>, postRepository: Repository<PostEntity>);
    report_invalid_question(req: JwtAuthGuardReq, body: {
        question_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidQuestionController {
    private questionmarketService;
    private _userSevice;
    private userNotificationRepository;
    private cacheManager;
    constructor(questionmarketService: QuestionMarketService, _userSevice: UserAuthenticationService, userNotificationRepository: Repository<UserNotificationEntity>, cacheManager: AppCache);
    confirm_report_invalid_question(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        question_ID: number;
        report_result: boolean;
    }): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
}
export declare class UserBlockEmailFromPrivateMessageController {
    private _userSevice;
    private cacheManager;
    private blackListRepository;
    private userPrivateMessageRepository;
    constructor(_userSevice: UserAuthenticationService, cacheManager: AppCache, blackListRepository: Repository<BlackListEntity>, userPrivateMessageRepository: Repository<UserPrivateMessageEntity>);
    userblockemailfromprivatemessage(req: JwtAuthGuardReq, body: {
        msg_ID: number;
    }): Promise<void>;
}
export declare class UserBuyASHOPitemController {
    private _userSevice;
    private fetchDataService;
    private cacheManager;
    private userRepository;
    private userInventoryRepository;
    constructor(_userSevice: UserAuthenticationService, fetchDataService: FetchDataService, cacheManager: AppCache, userRepository: Repository<UserEntity>, userInventoryRepository: Repository<UserInventoryEntity>);
    userbuyashopitem(req: JwtAuthGuardReq, body: {
        item_code: string;
        quantity: number;
    }): Promise<void>;
}
export declare class UserChangePasswordController {
    private jwt;
    private basicToolsService;
    constructor(jwt: JwtService, basicToolsService: BasicToolsService);
    userchangepassword(req: JwtAuthGuardReq, body: {
        user_password: string;
    }): Promise<void>;
}
export declare class ConfirmResetPasswordController {
    private jwt;
    private basicToolsService;
    private userRepository;
    private cacheManager;
    constructor(jwt: JwtService, basicToolsService: BasicToolsService, userRepository: Repository<UserEntity>, cacheManager: AppCache);
    resetpassword(query: {
        secretkey: string;
    }): Promise<any>;
}
export declare class UploadQuestionProductAvatarByImgFileController {
    private basictools;
    private readonly mediarepository;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache);
    uploaduseravatarbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadUserAvatarByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache);
    uploaduseravatarbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class UserUpdateProfileController {
    private _userSevice;
    private fetchDataService;
    private basictools;
    private cacheManager;
    private userRepository;
    private userInventoryRepository;
    constructor(_userSevice: UserAuthenticationService, fetchDataService: FetchDataService, basictools: BasicToolsService, cacheManager: AppCache, userRepository: Repository<UserEntity>, userInventoryRepository: Repository<UserInventoryEntity>);
    uploadschema: Joi.ObjectSchema<any>;
    userupdateprofile(req: JwtAuthGuardReq, body: {
        user_name: string;
        user_password: string;
        gender: UserGenders;
    }): Promise<void>;
}
