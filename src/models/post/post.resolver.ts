import { UseGuards } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { MediaListEntity } from "../media/media.entity";
import { PostEntity, postTypes } from "../post/post.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { ReportLoggerTypes } from "../reportLogger/reportlogger.entity";
import { UserEntity } from "../userauthentication/userauth.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";

let config = SystemDefaultConfig;

@Resolver(() => PostEntity)
export class PostEntityResolver {

    constructor(
        private _fetchdataService: FetchDataService,
        private _questionmarketService: QuestionMarketService,
        private _lessonhandlerservice: LessonHandlerService,
        private _userauthService: UserAuthenticationService
    ) { }

    @ResolveField(() => MediaListEntity)
    async lesson_avatar(@Parent() PostEntity: PostEntity) {

        let _cache = await this._lessonhandlerservice.getalllessonavatar();
        let _img = _cache.find(
            y => y.parent_ID == PostEntity.ID
        )

        let _name_null = config.DEFAULT_POST_AVATAR;
        let _null: MediaListEntity = {
            ID: 0,
            media_name: _name_null,
            media_type: "webp",
            media_path: config.POST_IMG_PATH + _name_null,
            user_ID: 0,
            parent_ID: 0,
            media_created_time: undefined,
            media_category: "",
            media_status: "trash"
        }

        if (_img) {
            return _img;
        } else {
            return _null
        }
    }

    @ResolveField(() => MediaListEntity)
    async question_avatar(@Parent() PostEntity: PostEntity) {

        let _cache = await this._questionmarketService.getallquestionproductavatar();

        let _img = _cache.find(
            y => y.parent_ID == PostEntity.ID
        )

        let _name_null = config.DEFAULT_POST_AVATAR;
        let _null: MediaListEntity = {
            ID: 0,
            media_name: _name_null,
            media_type: "webp",
            media_path: config.POST_IMG_PATH + _name_null,
            user_ID: 0,
            parent_ID: 0,
            media_created_time: undefined,
            media_category: "",
            media_status: "trash"
        }

        if (_img && PostEntity.post_type == postTypes.question_product) {
            return _img;
        } else {
            return _null
        }
    }

    @ResolveField(() => QuestionMarketAnswerEntity)
    @UseGuards(GqlJwtAuthGuard)
    async question_answer(@JwtCurrentUser() user: userJWTpayload, @Parent() PostEntity: PostEntity) {

        let _cache = await this._questionmarketService.getallquestionanswer();

        let _data = _cache.find(
            y => y.parent_ID == PostEntity.ID && y.user_ID == user.user_id
        )


        if (_data) {
            return _data
        } else {
            return null
        }
    }

    @ResolveField(() => [MediaListEntity])
    @UseGuards(GqlJwtAuthGuard)
    async question_imgs(@JwtCurrentUser() user: userJWTpayload, @Parent() PostEntity: PostEntity) {
        if (PostEntity.post_type == postTypes.question_product) {

            let _cache = await this._questionmarketService.getallquestionIMG();

            let _data = [..._cache.filter(
                y => y.parent_ID == PostEntity.ID
            )]

            return _data

        } else {
            return null
        }
    }

    @ResolveField(() => UserEntity)
    @UseGuards(GqlJwtAuthGuard)
    async author_info(@Parent() PostEntity: PostEntity) {

        let _cache = await this._userauthService.getallusers();

        let _curruser = {
            ..._cache.find(
                y => y.ID == PostEntity.post_author
            )
        }

        let _tempuser: Partial<UserEntity> = {
            ID: 0,
            user_password: "",
            user_secretcode: "",
            user_email: "",
            levelup_points: 0,
            user_experience: 0,
            user_stat: ""
        }
        _curruser = Object.assign(_curruser, _tempuser)
        return _curruser
    }

    @ResolveField(() => [QuestionMarket_UserAnswerEntity])
    @UseGuards(GqlJwtAuthGuard)
    async questionmarket_user_answer(@JwtCurrentUser() user: userJWTpayload, @Parent() PostEntity: PostEntity) {
        if (PostEntity.post_type == postTypes.question_product) {

            let _cache = await this._questionmarketService.getalluseranswerinmarket();

            let _data = [..._cache.filter(
                y => y.parent_ID == PostEntity.ID && y.answer_status == 'publish' && y.author_isBlocked == false
            )]

            return _data

        } else {
            return null
        }
    }

}