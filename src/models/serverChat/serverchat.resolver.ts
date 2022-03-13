import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args } from "@nestjs/graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { ServerChatEntity } from "./serverchat.entity";

let config = SystemDefaultConfig;

@Resolver(() => [ServerChatEntity])
export class ServerChatResolver {

    constructor(
        private readonly fetchDataService: FetchDataService,
    ) { }


    @Query(() => [ServerChatEntity])
    @UseGuards(GqlJwtAuthGuard)
    async server_chat_items(@Args('server_name') server_name: string, @JwtCurrentUser() user: userJWTpayload) {

        let _allMsgs = await this.fetchDataService.getallServerChatItems();
        let _servermsgs = _allMsgs.filter(
            y => y.server_name == server_name
        )

        return _servermsgs;

    }
    
}