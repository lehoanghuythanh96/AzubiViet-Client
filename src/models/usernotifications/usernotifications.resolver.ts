import { CACHE_MANAGER, Inject, UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Float } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphQLObjectType } from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { Repository } from "typeorm";
import { AppCache, _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity, UserNotification_Types } from "./usernotifications.entity";

let config = SystemDefaultConfig;

@Resolver(() => UserNotificationEntity)
export class UserNotificationResolver {

    constructor(
        private readonly _userauthService: UserAuthenticationService,
        @InjectRepository(UserNotificationEntity)
        private readonly _userNotificationRepository: Repository<UserNotificationEntity>,
        @Inject(CACHE_MANAGER) private cacheManager: AppCache
    ) { }


    @Query(() => [UserNotificationEntity])
    @UseGuards(GqlJwtAuthGuard)
    async user_notifications(@JwtCurrentUser() user: userJWTpayload) {

        let _allnoti = await this._userauthService.getallusernotifications();
        let _usernotis = _allnoti.filter(
            y => y.user_IDs.includes(user.user_id)
        )

        return _usernotis;

    }

    @Mutation(() => Float)
    @UseGuards(GqlJwtAuthGuard)
    async delete_single_notification(
        @JwtCurrentUser() user: userJWTpayload,
        @Args('notification_ID') notification_ID: number
    ) {

        let _result = await this._userauthService.deleteSingleNotiByID(notification_ID,user.user_id)

        return _result

    }
    
}