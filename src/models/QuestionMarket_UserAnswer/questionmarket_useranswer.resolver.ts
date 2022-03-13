import { CACHE_MANAGER, Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import GraphQLJSON from "graphql-type-json";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { Repository } from "typeorm";
import { AppCache, _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { MediaListEntity } from "../media/media.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity, UserNotification_Types } from "../usernotifications/usernotifications.entity";
import { QuestionMarket_UserAnswerEntity } from "./questionmarket_useranswer.entity";

@Resolver(() => QuestionMarket_UserAnswerEntity)
export class QuestionMarket_UserAnswerResolver {

    constructor(
        private questionmarketService: QuestionMarketService,
        @InjectRepository(MediaListEntity)
        private mediaListRepository: Repository<MediaListEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: AppCache,
        @InjectRepository(QuestionMarket_UserAnswerEntity)
        private useranswerRepository: Repository<QuestionMarket_UserAnswerEntity>,
        @InjectRepository(UserAnswerReviewEntity)
        private useranswerReviewRepository: Repository<UserAnswerReviewEntity>,
        @InjectRepository(UserNotificationEntity)
        private usernotificationRepository: Repository<UserNotificationEntity>,
        private userAuthService: UserAuthenticationService
    ) { }

    @ResolveField(() => [MediaListEntity])
    @UseGuards(GqlJwtAuthGuard)
    async answer_imgs(@JwtCurrentUser() user: userJWTpayload, @Parent() QuestionMarket_UserAnswerEntity: QuestionMarket_UserAnswerEntity) {

        let _cache = await this.questionmarketService.getalluseranswerIMG();

        let _data = [..._cache.filter(
            y => y.parent_ID == QuestionMarket_UserAnswerEntity.ID
        )]

        return _data
    }

    @ResolveField(() => GraphQLBoolean)
    @UseGuards(GqlJwtAuthGuard)
    async answer_is_outdated(@JwtCurrentUser() user: userJWTpayload, @Parent() QuestionMarket_UserAnswerEntity: QuestionMarket_UserAnswerEntity) {
        let now: Date = new Date();
        let _oldtime = new Date(QuestionMarket_UserAnswerEntity.answer_date)
        let _minus = now.getTime() - _oldtime.getTime();

        let ratio = _minus / (5 * 86400 * 1000)
        
        if (ratio >= 1 && !QuestionMarket_UserAnswerEntity.is_reviewed && !QuestionMarket_UserAnswerEntity.is_reported) {
            return true
        } else {
            return false
        }
    }

    @Mutation(() => GraphQLJSON)
    @UseGuards(GqlJwtAuthGuard)
    async delete_single_user_answer(
        @JwtCurrentUser() user: userJWTpayload,
        @Args('answer_ID') answer_ID: number
    ) {

        return await this.questionmarketService.deleteSingleUserAnswerByID(answer_ID,user.user_id)

    }
}