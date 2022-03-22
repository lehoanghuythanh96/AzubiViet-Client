import { Observable } from 'rxjs';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { LessonHandlerService } from './lesson-handler.service';
import Joi = require('joi');
import { EditSingleLessonBody, PublishLessonBody } from 'src/models/post/post.interface';
import { AddCategoryInput, LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { FetchDataService } from '../fetch-data/fetch-data.service';
export declare class LessonHandlerController {
}
export declare class AddLessonCategoryController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadschema: Joi.ObjectSchema<any>;
    addlessoncategory(req: JwtAuthGuardReq, body: AddCategoryInput): Promise<LessonCategoryEntity>;
}
export declare class UploadLessonImageController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadlessonimage(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class PublishNewLessonController {
    private _lessonservice;
    constructor(_lessonservice: LessonHandlerService);
    uploadschema: Joi.ObjectSchema<any>;
    publishnewlesson(req: JwtAuthGuardReq, body: PublishLessonBody): Observable<any>;
}
export declare class EditSingleLessonController {
    private _lessonservice;
    constructor(_lessonservice: LessonHandlerService);
    uploadschema: Joi.ObjectSchema<any>;
    editsinglelesson(req: JwtAuthGuardReq, body: EditSingleLessonBody): Observable<any>;
}
export declare class UploadLessonAvatarByimgFileController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadlessonavatarbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadLessonAvatarByUrlController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    uploadlessonavatarbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class DeletesinglelessonController {
    private fetchDataService;
    constructor(fetchDataService: FetchDataService);
    deletesinglelesson(req: any, body: {
        post_ID: number;
    }): Promise<import("typeorm").DeleteResult>;
}
