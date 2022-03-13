import { NestDefaultConfig } from "../nest_defaultconfig/nestdefaultconfig.entity";
import { PostEntity } from "../postentity/post.entity";
import { ReportLoggerEntity } from "../reportLoggers/reportlogger.entity";
import { UserEntity } from "../userentity/userinfo.entity";

export interface AdminInfo extends UserEntity {
    lessons: Array<PostEntity>,
    arealist: Array<any>,
    lessoncatlist: Array<any>,
    defaultconfig: NestDefaultConfig | null,
    report_loggers: ReportLoggerEntity[] | null
}