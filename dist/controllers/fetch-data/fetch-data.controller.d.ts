import { BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import Joi = require('joi');
import { FetchDataService } from './fetch-data.service';
import { JwtService } from '@nestjs/jwt';
import { UserAuthenticationService } from '../user-authentication/user-authentication.service';
import { ChatServerNames } from 'src/models/serverChat/serverchat.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { QuestionMarketService } from '../question-market/question-market.service';
export declare class FetchDataController {
}
export declare class AddSingleAreaController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    addsinglearea(req: JwtAuthGuardReq, body: {
        area_name: string;
    }): Observable<any>;
}
export declare class UserSubmitQandAController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    user_submit_QA(req: JwtAuthGuardReq, body: {
        item_content: string;
        img_arr: string[];
    }): Promise<void>;
}
export declare class UserSubmitQandA_AnswerController {
    private fetchDataService;
    private jwt;
    constructor(fetchDataService: FetchDataService, jwt: JwtService);
    uploadschema: Joi.ObjectSchema<any>;
    user_submit_QA_answer(req: JwtAuthGuardReq, body: {
        QA_ID: number;
        item_content: string;
    }): Promise<void>;
}
export declare class UserLikeQA_AnswerController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    userdeleteqa_answer(req: JwtAuthGuardReq, body: {
        answer_ID: number;
    }): Promise<void>;
}
export declare class UserLockQAItemController {
    private fetchDataService;
    private jwt;
    constructor(fetchDataService: FetchDataService, jwt: JwtService);
    userdeleteqa_answer(req: JwtAuthGuardReq, query: {
        secretkey: string;
    }): Promise<string>;
}
export declare class ReportInvalidQAController {
    private _userSevice;
    private fetchDataService;
    constructor(_userSevice: UserAuthenticationService, fetchDataService: FetchDataService);
    report_invalid_QA_Question(req: JwtAuthGuardReq, body: {
        QA_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidQA_QuestionController {
    private _userSevice;
    private fetchDataService;
    constructor(_userSevice: UserAuthenticationService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(_userSevice: UserAuthenticationService, fetchDataService: FetchDataService);
    report_invalid_QA_Answer(req: JwtAuthGuardReq, body: {
        QA_ID: number;
        report_notes: string;
    }): Promise<{
        selectedUsers: number[];
    }>;
}
export declare class ConfirmReportInvalidQA_AnswerController {
    private _userSevice;
    private fetchDataService;
    constructor(_userSevice: UserAuthenticationService, fetchDataService: FetchDataService);
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
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    user_send_serverchat_msg(req: JwtAuthGuardReq, body: {
        server_name: ChatServerNames;
        message_content: string;
    }): Promise<void>;
}
export declare class RemoveAllUserServerChatContentController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    remove_all_user_serverchat_content(req: JwtAuthGuardReq, body: {}): Promise<void>;
}
export declare class Upload_QandA_ImageByFileController {
    private readonly questionMarketService;
    private fetchDataService;
    constructor(questionMarketService: QuestionMarketService, fetchDataService: FetchDataService);
    uploadqandaimgbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class Upload_QandA_ImageByUrlController {
    private fetchDataService;
    private readonly localService;
    constructor(fetchDataService: FetchDataService, localService: QuestionMarketService);
    uploadqandaimgbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class DeleteTemp_QandA_ImageController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    deletetemporary_qanda_img(req: JwtAuthGuardReq, body: {
        img_name: string;
    }): Promise<import("typeorm").DeleteResult>;
}
export declare class TestController {
    result(): {
        message: string;
    };
}
