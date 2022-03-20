import { Observable } from 'rxjs';
import { MediaListEntity } from 'src/models/media/media.entity';
import { PostEntity } from 'src/models/post/post.entity';
import { FileUploadbyFormQuery } from 'src/models/req_upload/requpload.interface';
import { JwtAuthGuardReq } from 'src/tools/auth-tools/jwt-auth.guard';
import { BasicToolsService } from 'src/tools/basic-tools/basic-tools.service';
import { Repository } from 'typeorm';
import { LessonHandlerService } from './lesson-handler.service';
import Joi = require('joi');
import { EditSingleLessonBody, PublishLessonBody } from 'src/models/post/post.interface';
import { AddCategoryInput, LessonCategoryEntity } from 'src/models/lessoncategory/lessoncategory.entity';
import { AppCache } from 'src/models/cacheKeys/cacheKeys.entity';
export declare class LessonHandlerController {
}
export declare class AddLessonCategoryController {
    private readonly LessonCategoryRepository;
    private readonly CacheManager;
    constructor(LessonCategoryRepository: Repository<LessonCategoryEntity>, CacheManager: AppCache);
    uploadschema: Joi.ObjectSchema<any>;
    addlessoncategory(req: JwtAuthGuardReq, body: AddCategoryInput): Promise<LessonCategoryEntity>;
}
export declare class UploadLessonImageController {
    private basictools;
    private readonly mediarepository;
    private readonly CacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, CacheManager: AppCache);
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
    private basictools;
    private readonly mediarepository;
    private readonly CacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, CacheManager: AppCache);
    uploadlessonavatarbyimgfile(req: any, query: FileUploadbyFormQuery): Observable<any>;
}
export declare class UploadLessonAvatarByUrlController {
    private readonly basictools;
    private readonly mediarepository;
    private readonly CacheManager;
    constructor(basictools: BasicToolsService, mediarepository: Repository<MediaListEntity>, CacheManager: AppCache);
    uploadlessonavatarbyurl(req: any, body: {
        img_url: string;
    }): Observable<any>;
}
export declare class DeletesinglelessonController {
    private readonly postrepository;
    private readonly mediarepository;
    private readonly CacheManager;
    constructor(postrepository: Repository<PostEntity>, mediarepository: Repository<MediaListEntity>, CacheManager: AppCache);
    deletesinglelesson(req: any, body: {
        post_ID: number;
    }): Promise<import("typeorm").DeleteResult>;
}
