import { UseGuards } from "@nestjs/common";
import { ResolveField, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { Repository } from "typeorm";
import { AreaListEntity } from "../arealist/arealist.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { GuestQAndAEntity } from "../GuestQAndA/GuestQAndA.entity";
import { PostEntity } from "../post/post.entity";
import { PostCommentEntity } from "../postComment/postComment.entity";
import { UserEntity } from "../userauthentication/userauth.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { MainLandingPageEntity } from "./mainLandingPageInfo.entity";

let config = SystemDefaultConfig;

@Resolver(() => MainLandingPageEntity)
export class MainLandingPageInfoResolver {

    constructor(
        @InjectRepository(MainLandingPageEntity)
        private readonly mainlandingpagerepository: Repository<MainLandingPageEntity>,
        private _fetchdataService: FetchDataService,
        private lessonhandlerService: LessonHandlerService,
        private questionmarketService: QuestionMarketService,
        private _userauthService: UserAuthenticationService
    ) { }

    @Query(() => MainLandingPageEntity)
    async mainlandingpageInfo() {
        let _result = await this.mainlandingpagerepository.find();
        return _result
    }

    @ResolveField(() => [PostCommentEntity])
    async all_comments() {
        return await this._fetchdataService.getAllguestQandA_items();
    }

    @ResolveField(() => [GuestQAndAEntity])
    async all_QandA() {
        let allQAs = await this._fetchdataService.getAllguestQandA_items();
        return allQAs.filter(
            y => y.item_status == "publish" && y.author_isBlocked == false
        )
    }

    @ResolveField(() => [PostEntity])
    async all_lessons() {
        return await this.lessonhandlerService.getallpubliclesson();
    }

    @ResolveField(() => [PostEntity])
    async all_questionproducts() {
        return await this.questionmarketService.getall_questionproduct();
    }


    @ResolveField(() => DefaultConfigEntity)
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