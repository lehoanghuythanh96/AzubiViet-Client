import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Float } from "@nestjs/graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserNotificationEntity } from "./usernotifications.entity";

let config = SystemDefaultConfig;

@Resolver(() => UserNotificationEntity)
export class UserNotificationResolver {

    constructor(
        private fetchDataService: FetchDataService
    ) { }


    @Query(() => [UserNotificationEntity])
    @UseGuards(GqlJwtAuthGuard)
    async user_notifications(@JwtCurrentUser() user: userJWTpayload) {

        let _allnoti = await this.fetchDataService.getallusernotifications();
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

        let _result = await this.fetchDataService.deleteSingleNotiByID(notification_ID,user.user_id)

        return _result

    }
    
}