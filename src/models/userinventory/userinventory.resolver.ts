import { UseGuards } from "@nestjs/common";
import { Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { UserAuthenticationService } from "src/controllers/user-authentication/user-authentication.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { ShopItemEntity } from "../ShopItem/shopitem.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
import { UserInventoryEntity } from "./userinventory.entity";

let config = SystemDefaultConfig;

@Resolver(() => UserInventoryEntity)
export class UserInventoryResolver {

    constructor(
        private readonly fetchDataService: FetchDataService,
        private readonly userService: UserAuthenticationService
    ) { }

    @Query(() => [UserInventoryEntity])
    @UseGuards(GqlJwtAuthGuard)
    async user_inventory(@JwtCurrentUser() user: userJWTpayload) { 
        let _allInventories = await this.userService.getAll_UserInventories();

        let _result = _allInventories.filter(y => y.user_ID == user.user_id)

        return _result;
    }

    @ResolveField(() => GraphQLString, {nullable: true})
    async item_name(@Parent() UserInventoryEntity: UserInventoryEntity) {
        let _name = await this.fetchDataService.getShopItemNamefromCode(UserInventoryEntity.item_code)
        return _name
    }

    @ResolveField(() => GraphQLString, {nullable: true})
    async item_avatar(@Parent() UserInventoryEntity: UserInventoryEntity) {

        let allShopitems = await this.fetchDataService.getAll_ShopItems();
        let foundShopitem = allShopitems.find(
            y => y.item_code == UserInventoryEntity.item_code
        )

        if (!foundShopitem) {
            return null
        }

        return foundShopitem.item_avatar
    }

    @ResolveField(() => GraphQLString, {nullable: true})
    async item_description(@Parent() UserInventoryEntity: UserInventoryEntity) {

        let allShopitems = await this.fetchDataService.getAll_ShopItems();
        let foundShopitem = allShopitems.find(
            y => y.item_code == UserInventoryEntity.item_code
        )

        if (!foundShopitem) {
            return null
        }

        return foundShopitem.item_description
    }

}