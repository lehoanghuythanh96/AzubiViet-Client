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
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserInventoryEntity } from 'src/models/userinventory/userinventory.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import Joi = require('joi');
export declare class UserAuthenticationController {
}
export declare class userGGloginController {
    private fetchDataService;
    private jwt;
    constructor(fetchDataService: FetchDataService, jwt: JwtService);
    userAuthGoogle(GGauthBody: GGLoginauthBody): Promise<BadRequestException | userJWTpayload>;
}
export declare class NewUserRegisterController {
    private jwt;
    private fetchDataService;
    constructor(jwt: JwtService, fetchDataService: FetchDataService);
    newuserregister(body: {
        user_email: string;
        user_password: string;
    }): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
export declare class UserLoginController {
    private jwt;
    private fetchDataService;
    constructor(jwt: JwtService, fetchDataService: FetchDataService);
    userlogin(body: {
        user_email: string;
        user_password: string;
    }): Promise<userJWTpayload>;
}
export declare class ConfirmUserController {
    private jwt;
    private fetchDataService;
    constructor(jwt: JwtService, fetchDataService: FetchDataService);
    confirmuser(query: {
        secretkey: string;
    }): Promise<string>;
}
export declare class ReportUserAnswerReviewInvalidControllerInvalidController {
    private questionmarketService;
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
    report_invalid_question(req: JwtAuthGuardReq, body: {
        question_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidQuestionController {
    private questionmarketService;
    private fetchDataService;
    constructor(questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    userblockemailfromprivatemessage(req: JwtAuthGuardReq, body: {
        msg_ID: number;
    }): Promise<void>;
}
export declare class UserBuyASHOPitemController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    userbuyashopitem(req: JwtAuthGuardReq, body: {
        item_code: string;
        quantity: number;
    }): Promise<void>;
}
export declare class UserChangePasswordController {
    private jwt;
    private fetchDataService;
    constructor(jwt: JwtService, fetchDataService: FetchDataService);
    userchangepassword(req: JwtAuthGuardReq, body: {
        user_password: string;
    }): Promise<void>;
}
export declare class ConfirmResetPasswordController {
    private jwt;
    private fetchDataService;
    constructor(jwt: JwtService, fetchDataService: FetchDataService);
    resetpassword(query: {
        secretkey: string;
    }): Promise<any>;
}
export declare class UploadQuestionProductAvatarByImgFileController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploaduseravatarbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadUserAvatarByUrlController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
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
