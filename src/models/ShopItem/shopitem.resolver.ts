import { UseGuards } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { ShopItemEntity } from "./shopitem.entity";

let config = SystemDefaultConfig;

@Resolver(() => [ShopItemEntity])
export class ShopItemResolver {

    constructor(
        private readonly fetchDataService: FetchDataService,
    ) { }


    @Query(() => [ShopItemEntity])
    @UseGuards(GqlJwtAuthGuard)
    async shop_items(@JwtCurrentUser() user: userJWTpayload) {

        let _allItems = await this.fetchDataService.getAll_ShopItems();

        return _allItems;

    }

}