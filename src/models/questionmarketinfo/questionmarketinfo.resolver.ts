import { UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { Connection, Repository } from "typeorm";
import { AreaListEntity } from "../arealist/arealist.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
import { UserEntity } from "../userauthentication/userauth.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { QuestionMarketInfoEntity } from "./questionmarketinfo.entity";

let config = SystemDefaultConfig;

@Resolver(() => QuestionMarketInfoEntity)
export class QuestionMarketInfoResolver {

    constructor(
        private readonly _fetchdataService: FetchDataService,
        private readonly _userauthService: UserAuthenticationService,
        @InjectRepository(QuestionMarketInfoEntity)
        private readonly QuestionMarketInfoRepository: Repository<QuestionMarketInfoEntity>,
        private _questionMarketService: QuestionMarketService,
    ) {
    }


    @Query(() => QuestionMarketInfoEntity)
    @UseGuards(GqlJwtAuthGuard)
    async questionmarketinfo(@JwtCurrentUser() user: userJWTpayload) {
        await this._fetchdataService.deleteall_unused_cdnfiles(user);
        
        let _result = await this.QuestionMarketInfoRepository.find();
        return _result;
    }

    @ResolveField(() => [AreaListEntity])
    @UseGuards(GqlJwtAuthGuard)
    async product_tree(@JwtCurrentUser() user: userJWTpayload) {
        return this._fetchdataService.getallarea();
    }

    @ResolveField(() => [UserAnswerReviewEntity])
    @UseGuards(GqlJwtAuthGuard)
    async answer_reviews(@JwtCurrentUser() user: userJWTpayload) {
        let _cache = await this._questionMarketService.getAllUserAnswerReviews();

        let _data = _cache.filter(
            y => (y.answerer_ID == user.user_id && y.review_status == "publish") || (y.is_reported == true && y.report_controllers.includes(user.user_id)) || y.review_author == user.user_id
        )

        return _data
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

    @ResolveField(() => UserEntity)
    @UseGuards(GqlJwtAuthGuard)
    async userinfo(@JwtCurrentUser() user: userJWTpayload) {

        let _allusers = await this._userauthService.getallusers();

        let _result = _allusers.find(y => y.ID == user.user_id)

        return _result;
    }

    @ResolveField(() => UserEntity)
    @UseGuards(GqlJwtAuthGuard)
    async shop_items(@JwtCurrentUser() user: userJWTpayload) {

        let allItems = await this._fetchdataService.getAll_ShopItems();

        return allItems;
    }

}