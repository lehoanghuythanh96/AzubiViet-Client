"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInventoryResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const userinventory_entity_1 = require("./userinventory.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let UserInventoryResolver = class UserInventoryResolver {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async user_inventory(user) {
        let _allInventories = await this.fetchDataService.getAll_UserInventories();
        let _result = _allInventories.filter(y => y.user_ID == user.user_id);
        return _result;
    }
    async item_name(UserInventoryEntity) {
        let _name = await this.fetchDataService.getShopItemNamefromCode(UserInventoryEntity.item_code);
        return _name;
    }
    async item_avatar(UserInventoryEntity) {
        let allShopitems = await this.fetchDataService.getAll_ShopItems();
        let foundShopitem = allShopitems.find(y => y.item_code == UserInventoryEntity.item_code);
        if (!foundShopitem) {
            return null;
        }
        return foundShopitem.item_avatar;
    }
    async item_description(UserInventoryEntity) {
        let allShopitems = await this.fetchDataService.getAll_ShopItems();
        let foundShopitem = allShopitems.find(y => y.item_code == UserInventoryEntity.item_code);
        if (!foundShopitem) {
            return null;
        }
        return foundShopitem.item_description;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [userinventory_entity_1.UserInventoryEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserInventoryResolver.prototype, "user_inventory", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_2.GraphQLString, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userinventory_entity_1.UserInventoryEntity]),
    __metadata("design:returntype", Promise)
], UserInventoryResolver.prototype, "item_name", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_2.GraphQLString, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userinventory_entity_1.UserInventoryEntity]),
    __metadata("design:returntype", Promise)
], UserInventoryResolver.prototype, "item_avatar", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_2.GraphQLString, { nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userinventory_entity_1.UserInventoryEntity]),
    __metadata("design:returntype", Promise)
], UserInventoryResolver.prototype, "item_description", null);
UserInventoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => userinventory_entity_1.UserInventoryEntity),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UserInventoryResolver);
exports.UserInventoryResolver = UserInventoryResolver;
//# sourceMappingURL=userinventory.resolver.js.map