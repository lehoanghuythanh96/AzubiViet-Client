import { BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AreaListEntity } from 'src/models/arealist/arealist.entity';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { Repository } from 'typeorm';
import Joi = require('joi');
import { GuestQAndAEntity } from 'src/models/GuestQAndA/GuestQAndA.entity';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
import { FetchDataService } from './fetch-data.service';
import { JwtService } from '@nestjs/jwt';
import { PostLikeEntity } from 'src/models/postLikes/postlike.entity';
import { ReportLoggerEntity } from 'src/models/reportLogger/reportlogger.entity';
import { UserNotificationEntity } from 'src/models/usernotifications/usernotifications.entity';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { ChatServerNames, ServerChatEntity } from 'src/models/serverChat/serverchat.entity';
import { MediaListEntity } from 'src/models/media/media.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { QuestionMarketService } from '../question-market/question-market.service';
export declare class FetchDataController {
}
export declare class AddSingleAreaController {
    private readonly areaListRepository;
    constructor(areaListRepository: Repository<AreaListEntity>);
    uploadschema: Joi.ObjectSchema<any>;
    addsinglearea(req: JwtAuthGuardReq, body: {
        area_name: string;
    }): Observable<any>;
}
export declare class UserSubmitQandAController {
    private readonly guestQandARepository;
    private cacheManager;
    private mediaListRepository;
    constructor(guestQandARepository: Repository<GuestQAndAEntity>, cacheManager: AppCache, mediaListRepository: Repository<MediaListEntity>);
    uploadschema: Joi.ObjectSchema<any>;
    user_submit_QA(req: JwtAuthGuardReq, body: {
        item_content: string;
        img_arr: string[];
    }): Promise<void>;
}
export declare class UserSubmitQandA_AnswerController {
    private readonly guestQandARepository;
    private cacheManager;
    private _fetchdataService;
    private jwt;
    constructor(guestQandARepository: Repository<GuestQAndAEntity>, cacheManager: AppCache, _fetchdataService: FetchDataService, jwt: JwtService);
    uploadschema: Joi.ObjectSchema<any>;
    user_submit_QA_answer(req: JwtAuthGuardReq, body: {
        QA_ID: number;
        item_content: string;
    }): Promise<void>;
}
export declare class UserLikeQA_AnswerController {
    private readonly postLikesRepository;
    private cacheManager;
    private _fetchdataService;
    private jwt;
    constructor(postLikesRepository: Repository<PostLikeEntity>, cacheManager: AppCache, _fetchdataService: FetchDataService, jwt: JwtService);
    userlikeqaanswer(req: JwtAuthGuardReq, body: {
        answer_ID: number;
    }): Promise<void>;
}
export declare class UserThankyou_QAAnswerController {
    private jwt;
    private fetchDataService;
    constructor(jwt: JwtService, fetchDataService: FetchDataService);
    userthankyou_qa_answer(query: {
        secretkey: string;
    }): Promise<BadRequestException | "Your thanks have been sent to the answer author successfully">;
}
export declare class UserDeleteQA_AnswerController {
    private readonly guestQandARepository;
    private cacheManager;
    private _fetchdataService;
    constructor(guestQandARepository: Repository<GuestQAndAEntity>, cacheManager: AppCache, _fetchdataService: FetchDataService);
    userdeleteqa_answer(req: JwtAuthGuardReq, body: {
        answer_ID: number;
    }): Promise<void>;
}
export declare class UserLockQAItemController {
    private readonly guestQandARepository;
    private cacheManager;
    private _fetchdataService;
    private jwt;
    constructor(guestQandARepository: Repository<GuestQAndAEntity>, cacheManager: AppCache, _fetchdataService: FetchDataService, jwt: JwtService);
    userdeleteqa_answer(req: JwtAuthGuardReq, query: {
        secretkey: string;
    }): Promise<string>;
}
export declare class ReportInvalidQAController {
    private _userSevice;
    private cacheManager;
    private userNotificationRepository;
    private reportLoggerRepository;
    private fetchDataService;
    private guestQandARepository;
    constructor(_userSevice: UserAuthenticationService, cacheManager: AppCache, userNotificationRepository: Repository<UserNotificationEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>, fetchDataService: FetchDataService, guestQandARepository: Repository<GuestQAndAEntity>);
    report_invalid_QA_Question(req: JwtAuthGuardReq, body: {
        QA_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidQA_QuestionController {
    private _userSevice;
    private userNotificationRepository;
    private fetchDataService;
    private cacheManager;
    constructor(_userSevice: UserAuthenticationService, userNotificationRepository: Repository<UserNotificationEntity>, fetchDataService: FetchDataService, cacheManager: AppCache);
    confirm_report_invalid_qa_question(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        QA_ID: number;
        report_result: boolean;
    }): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
}
export declare class ReportInvalidQA_AnswerController {
    private _userSevice;
    private cacheManager;
    private userNotificationRepository;
    private reportLoggerRepository;
    private fetchDataService;
    private guestQandARepository;
    constructor(_userSevice: UserAuthenticationService, cacheManager: AppCache, userNotificationRepository: Repository<UserNotificationEntity>, reportLoggerRepository: Repository<ReportLoggerEntity>, fetchDataService: FetchDataService, guestQandARepository: Repository<GuestQAndAEntity>);
    report_invalid_QA_Answer(req: JwtAuthGuardReq, body: {
        QA_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidQA_AnswerController {
    private _userSevice;
    private userNotificationRepository;
    private fetchDataService;
    private cacheManager;
    constructor(_userSevice: UserAuthenticationService, userNotificationRepository: Repository<UserNotificationEntity>, fetchDataService: FetchDataService, cacheManager: AppCache);
    confirm_report_invalid_qa_answer(req: JwtAuthGuardReq, body: {
        notification_ID: number;
        QA_ID: number;
        report_result: boolean;
    }): Promise<{
        selectedUsers: number[];
    } | {
        selectedUsers?: undefined;
    }>;
}
export declare class UserSendServerchatMsgController {
    private _userSevice;
    private serverChatRepository;
    private fetchDataService;
    private cacheManager;
    constructor(_userSevice: UserAuthenticationService, serverChatRepository: Repository<ServerChatEntity>, fetchDataService: FetchDataService, cacheManager: AppCache);
    uploadschema: Joi.ObjectSchema<any>;
    user_send_serverchat_msg(req: JwtAuthGuardReq, body: {
        server_name: ChatServerNames;
        message_content: string;
    }): Promise<void>;
}
export declare class RemoveAllUserServerChatContentController {
    private serverChatRepository;
    private cacheManager;
    constructor(serverChatRepository: Repository<ServerChatEntity>, cacheManager: AppCache);
    remove_all_user_serverchat_content(req: JwtAuthGuardReq, body: {}): Promise<void>;
}
export declare class Upload_QandA_ImageByFileController {
    private basictools;
    private readonly mediarepository;
    private readonly questionMarketService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, questionMarketService: QuestionMarketService, cacheManager: AppCache);
    uploadqandaimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class Upload_QandA_ImageByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly localService;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, localService: QuestionMarketService, cacheManager: AppCache);
    uploadqandaimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class DeleteTemp_QandA_ImageController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly cacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, cacheManager: AppCache);
    deletetemporary_qanda_img(req: JwtAuthGuardReq, body: {
        img_name: string;
    }): Promise<import("typeorm").DeleteResult>;
}
