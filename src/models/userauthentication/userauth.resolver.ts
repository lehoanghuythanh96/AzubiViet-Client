import { BadRequestException, CACHE_MANAGER, ForbiddenException, Inject, UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import GraphQLJSON, { GraphQLJSONObject } from "graphql-type-json";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { Repository } from "typeorm";
import { AppCache, _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { LevelTableEntity } from "../leveltable/leveltable.entity";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { ReportLoggerEntity, ReportLoggerInput, ReportLoggerTypes } from "../reportLogger/reportlogger.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
import { UserInventoryEntity } from "../userinventory/userinventory.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity, UserNotificationInput, UserNotification_Types } from "../usernotifications/usernotifications.entity";
import { UserEntity } from "./userauth.entity";

let config = SystemDefaultConfig;

@Resolver(() => UserEntity)
export class UserEntityResolver {

    constructor(
        private _userSevice: UserAuthenticationService,
        private questionmarketService: QuestionMarketService,
        @InjectRepository(LevelTableEntity)
        private leveltableRepository: Repository<LevelTableEntity>,
        @InjectRepository(QuestionMarket_UserAnswerEntity)
        private userAnswerRepository: Repository<QuestionMarket_UserAnswerEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache,
        @InjectRepository(UserNotificationEntity)
        private userNotificationRepository: Repository<UserNotificationEntity>,
        @InjectRepository(ReportLoggerEntity) 
        private reportLoggerRepository: Repository<ReportLoggerEntity>,
        @InjectRepository(UserAnswerReviewEntity)
        private userAnswerReviewRepository: Repository<UserAnswerReviewEntity>,
        private fetchDataService: FetchDataService,
    ) { }

    @Query(() => UserEntity)
    @UseGuards(GqlJwtAuthGuard)
    async user_info(@JwtCurrentUser() user: userJWTpayload) { 

        await this.fetchDataService.deleteall_unused_cdnfiles(user);

        let _allusers = await this._userSevice.getallusers();

        let _result = _allusers.find(y => y.ID == user.user_id)

        return _result;
    }

    @ResolveField(() => MediaListEntity)
    @UseGuards(GqlJwtAuthGuard)
    async user_avatar(@JwtCurrentUser() user: userJWTpayload, @Parent() UserEntity: UserEntity) {

        let _cache = await this._userSevice.getalluseravatar();

        let _data = _cache.find(y => y.parent_ID == UserEntity.ID && y.user_ID == UserEntity.ID)

        let _null_val: MediaListEntity = {
            ID: 0,
            media_name: config.DEFAULT_USER_AVATAR,
            media_type: "webp",
            media_path: config.USER_IMG_PATH,
            user_ID: 0,
            parent_ID: 0,
            media_created_time: new Date(),
            media_category: "",
            media_status: "trash"
        }

        if (_data) {
            return _data
        } else {
            return _null_val;
        }
    }

    @ResolveField(() => [QuestionMarket_UserAnswerEntity])
    @UseGuards(GqlJwtAuthGuard)
    async user_private_answers(@JwtCurrentUser() user: userJWTpayload, @Parent() UserEntity: UserEntity) {

        let allUserAnswer = await this.questionmarketService.getalluseranswerinmarket();

        let _result = allUserAnswer.filter(
            y => y.user_ID == user.user_id && y.answer_status == "publish"
        )

        return _result

    }

    @ResolveField(() => Int)
    @UseGuards(GqlJwtAuthGuard)
    async user_level(@JwtCurrentUser() user: userJWTpayload, @Parent() UserEntity: UserEntity) {

        let allUserLevels = await this._userSevice.getAllLevelPoints();

        let filteredLevels = [...allUserLevels.filter(
            y => y.experience >= UserEntity.user_experience
        )]

        filteredLevels = filteredLevels.sort((a, b) => { return a.level - b.level })

        return filteredLevels[0].level

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

    @ResolveField(() => Int)
    @UseGuards(GqlJwtAuthGuard)
    async levelup_points(@JwtCurrentUser() user: userJWTpayload, @Parent() UserEntity: UserEntity) {
        let allUserLevels = await this._userSevice.getAllLevelPoints();

        let filteredLevels = [...allUserLevels.filter(
            y => y.experience >= UserEntity.user_experience
        )]

        filteredLevels = filteredLevels.sort((a, b) => { return a.level - b.level })

        return filteredLevels[0].experience
    }

    @ResolveField(() => [UserInventoryEntity])
    @UseGuards(GqlJwtAuthGuard)
    async user_inventory(@JwtCurrentUser() user: userJWTpayload, @Parent() UserEntity: UserEntity) {
        let allItems = await this._userSevice.getAll_UserInventories();

        let filteredItems = [...allItems.filter(
            y => y.user_ID == UserEntity.ID
        )]

        return filteredItems
    }

}