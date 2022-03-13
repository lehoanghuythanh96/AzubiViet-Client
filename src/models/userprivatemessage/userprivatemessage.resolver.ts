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
import { UserPrivateMessageEntity } from "./userprivatemessage.entity";

let config = SystemDefaultConfig;

@Resolver(() => [UserPrivateMessageEntity])
export class UserPrivateMessageResolver {

    constructor(
        private readonly _userauthService: UserAuthenticationService,
        @InjectRepository(UserPrivateMessageEntity)
        private readonly _userprivatemessageRepository: Repository<UserPrivateMessageEntity>,
    ) { }


    @Query(() => [UserPrivateMessageEntity])
    @UseGuards(GqlJwtAuthGuard)
    async user_private_messages(@JwtCurrentUser() user: userJWTpayload) {

        let _allmsgs = await this._userauthService.getAllUserPrivateMessages();
        let _usermsgs = _allmsgs.filter(
            y => y.user_ID == user.user_id
        )

        return _usermsgs;

    }
    
}