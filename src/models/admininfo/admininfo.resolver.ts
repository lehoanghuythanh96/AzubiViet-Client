import { BadRequestException, UseGuards } from "@nestjs/common";
import { ResolveField, Resolver, Query } from "@nestjs/graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { AreaListEntity } from "../arealist/arealist.entity";
import { _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { PostEntity } from "../post/post.entity";
import { ReportLoggerEntity } from "../reportLogger/reportlogger.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { AdminInfoEntity } from "./admininfo.entity";

let config = SystemDefaultConfig;

@Resolver(() => AdminInfoEntity)
export class AdminInfoResolver {

    constructor(
        private fetchDataService: FetchDataService,
        private _lessonhandlerService: LessonHandlerService
    ) { }

    @Query(() => AdminInfoEntity)
    @UseGuards(GqlJwtAuthGuard)
    async admininfo(@JwtCurrentUser() user: userJWTpayload) {
        await this.fetchDataService.deleteall_unused_cdnfiles(user);

        let _allusers = await this.fetchDataService.getallusers();
        let _data = _allusers.filter(y => y.user_email == user.user_email)[0]
        if (_data) {
            return _data
        } else {
            return new BadRequestException(
                {
                    message: "User not found"
                }
            )
        }
    }

    @ResolveField(() => [PostEntity])
    @UseGuards(GqlJwtAuthGuard)
    async lessons() {
        return await this._lessonhandlerService.getallpubliclesson();
    }

    @ResolveField(() => [AreaListEntity])
    @UseGuards(GqlJwtAuthGuard)
    async arealist() {
        return await this.fetchDataService.getallarea();
    }

    @ResolveField(() => [LessonCategoryEntity])
    @UseGuards(GqlJwtAuthGuard)
    async lessoncatlist() {
        return await this._lessonhandlerService.getall_lessoncategory();
    }

    @ResolveField(() => [ReportLoggerEntity])
    @UseGuards(GqlJwtAuthGuard)
    async report_loggers() {
        return await this.fetchDataService.getallReportLogger();
    }

    @ResolveField(() => DefaultConfigEntity)
    @UseGuards(GqlJwtAuthGuard)
    defaultconfig() {
        let _config: DefaultConfigEntity = {
            postimg_path: config.POST_IMG_PATH,
            default_post_avatar: config.DEFAULT_POST_AVATAR,
            userimg_path: config.USER_IMG_PATH,
            shopitem_img_path: config.SHOPITEM_IMG_PATH,
            QA_img_path: config.QA_IMG_PATH
        }
        return _config
    }

}