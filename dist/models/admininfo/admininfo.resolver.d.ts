import { BadRequestException } from "@nestjs/common";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { PostEntity } from "../post/post.entity";
import { ReportLoggerEntity } from "../reportLogger/reportlogger.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
export declare class AdminInfoResolver {
    private fetchDataService;
    private _lessonhandlerService;
    constructor(fetchDataService: FetchDataService, _lessonhandlerService: LessonHandlerService);
    admininfo(user: userJWTpayload): Promise<import("../userauthentication/userauth.entity").UserEntity | BadRequestException>;
    lessons(): Promise<PostEntity[]>;
    arealist(): Promise<AreaListEntity[]>;
    lessoncatlist(): Promise<LessonCategoryEntity[]>;
    report_loggers(): Promise<ReportLoggerEntity[]>;
    defaultconfig(): DefaultConfigEntity;
}
