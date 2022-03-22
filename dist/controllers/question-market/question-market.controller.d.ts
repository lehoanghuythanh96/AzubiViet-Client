import { JwtService } from '@nestjs/jwt';
import Joi = require('joi');
import { Observable } from 'rxjs';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { AddCategoryInput } from 'src/models/lessoncategory/lessoncategory.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { AddNewQuestionProducPostBody, EditQuestionProducPostBody, PostInput } from 'src/models/post/post.interface';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { FetchDataService } from '../fetch-data/fetch-data.service';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { QuestionMarketService } from './question-market.service';
export declare class QuestionMarketController {
}
export declare class AddQuestionProductCategoryController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    addquestionproductcategory(req: JwtAuthGuardReq, body: AddCategoryInput): Promise<{
        category_name: string;
        area_ID: number;
        user_ID: number;
    } & import("../../models/questionproductcategory/questionproductcategory.entity").QuestionProductCategoryEntity>;
}
export declare class UploadQuestionProductImageByFileController {
    private readonly localService;
    private fetchDataService;
    constructor(localService: QuestionMarketService, fetchDataService: FetchDataService);
    uploadquestionproductimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadQuestionProductImageByUrlController {
    private readonly localService;
    private fetchDataService;
    constructor(localService: QuestionMarketService, fetchDataService: FetchDataService);
    uploadquestionproductimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class UploadQuestionProductAnswerImageByFileController {
    private readonly localService;
    private fetchDataService;
    constructor(localService: QuestionMarketService, fetchDataService: FetchDataService);
    uploadquestionproductanswerimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadQuestionProductAnswerImageByUrlController {
    private readonly localService;
    private fetchDataService;
    constructor(localService: QuestionMarketService, fetchDataService: FetchDataService);
    uploadquestionproductanswerimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class DeleteTempQuestionProductImageController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    deletetemporaryquestionproductimg(req: JwtAuthGuardReq, body: {
        img_name: string;
    }): Promise<import("typeorm").DeleteResult>;
}
export declare class DeleteTempQuestionUserAnswerImageController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    deletetemporaryquestionuseranswerimg(req: JwtAuthGuardReq, body: {
        img_name: string;
    }): Promise<import("typeorm").DeleteResult>;
}
export declare class CreateNewQuestionProductController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    createnewquestionproduct(req: JwtAuthGuardReq, body: AddNewQuestionProducPostBody): Promise<PostInput & import("src/models/post/post.entity").PostEntity>;
}
export declare class EditPrivateQuestionProductController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    editprivatequestionproduct(req: JwtAuthGuardReq, body: EditQuestionProducPostBody): Promise<import("typeorm").UpdateResult>;
}
export declare class UserRequiredReviewUpdateController {
    private _questionmarketService;
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private readonly localService;
    private fetchDataService;
    constructor(localService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    private readonly localService;
    constructor(fetchDataService: FetchDataService, localService: QuestionMarketService);
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
    private fetchDataService;
    constructor(questionMarketService: QuestionMarketService, userService: UserAuthenticationService, jwt: JwtService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, fetchDataService: FetchDataService);
    userconfirmreview(body: {
        review_ID: number;
        isLiked: boolean;
        notification_ID: number;
    }): Promise<number>;
}
export declare class useranswer_reportedReviewerRequireOriginalAnswerController {
    private _questionmarketService;
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
    useranswer_reportedReviewerRequireOriginalAnswer(req: JwtAuthGuardReq, body: {
        user_answer_ID: number;
    }): Promise<import("src/models/questionmarketanswer/questionmarketanswer.entity").QuestionMarketAnswerEntity>;
}
export declare class ReportedQuestionAuthorRequiredDataController {
    private _questionmarketService;
    constructor(_questionmarketService: QuestionMarketService);
    reportedquestion_authorrequiredata(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<import("src/models/post/post.entity").PostEntity>;
}
export declare class SendPrivateMessageToQuestionAuthorController {
    private _questionmarketService;
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, fetchDataService: FetchDataService);
    userreportexpiredanswer(req: JwtAuthGuardReq, body: {
        user_answer_ID: number;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class UserDeleteSingleQuestionProductController {
    private _questionmarketService;
    private _userauthService;
    private fetchDataService;
    constructor(_questionmarketService: QuestionMarketService, _userauthService: UserAuthenticationService, fetchDataService: FetchDataService);
    userdeletesinglequestionproduct(req: JwtAuthGuardReq, body: {
        question_ID: number;
    }): Promise<void>;
}
