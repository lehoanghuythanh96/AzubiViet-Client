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
exports.UserEntityResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const media_entity_1 = require("../media/media.entity");
const questionmarket_useranswer_entity_1 = require("../QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const userinventory_entity_1 = require("../userinventory/userinventory.entity");
const userauth_entity_1 = require("./userauth.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let UserEntityResolver = class UserEntityResolver {
    constructor(questionmarketService, fetchDataService) {
        this.questionmarketService = questionmarketService;
        this.fetchDataService = fetchDataService;
    }
    async user_info(user) {
        await this.fetchDataService.deleteall_unused_cdnfiles(user);
        let _allusers = await this.fetchDataService.getallusers();
        let _result = _allusers.find(y => y.ID == user.user_id);
        return _result;
    }
    async user_avatar(user, UserEntity) {
        let _cache = await this.fetchDataService.getalluseravatar();
        let _data = _cache.find(y => y.parent_ID == UserEntity.ID && y.user_ID == UserEntity.ID);
        let _null_val = {
            ID: 0,
            media_name: config.DEFAULT_USER_AVATAR,
            media_type: "webp",
            media_path: config.USER_IMG_PATH,
            user_ID: 0,
            parent_ID: 0,
            media_created_time: new Date(),
            media_category: "",
            media_status: "trash"
        };
        if (_data) {
            return _data;
        }
        else {
            return _null_val;
        }
    }
    async user_private_answers(user, UserEntity) {
        let allUserAnswer = await this.questionmarketService.getalluseranswerinmarket();
        let _result = allUserAnswer.filter(y => y.user_ID == user.user_id && y.answer_status == "publish");
        return _result;
    }
    async user_level(user, UserEntity) {
        let allUserLevels = await this.fetchDataService.getAllLevelPoints();
        let filteredLevels = [...allUserLevels.filter(y => y.experience >= UserEntity.user_experience)];
        filteredLevels = filteredLevels.sort((a, b) => { return a.level - b.level; });
        return filteredLevels[0].level;
    }
    defaultconfig() {
        let _config = {
            postimg_path: config.POST_IMG_PATH,
            default_post_avatar: config.DEFAULT_POST_AVATAR,
            userimg_path: config.USER_IMG_PATH,
            shopitem_img_path: config.SHOPITEM_IMG_PATH,
            QA_img_path: config.QA_IMG_PATH
        };
        return _config;
    }
    async levelup_points(user, UserEntity) {
        let allUserLevels = await this.fetchDataService.getAllLevelPoints();
        let filteredLevels = [...allUserLevels.filter(y => y.experience >= UserEntity.user_experience)];
        filteredLevels = filteredLevels.sort((a, b) => { return a.level - b.level; });
        return filteredLevels[0].experience;
    }
    async user_inventory(user, UserEntity) {
        let allItems = await this.fetchDataService.getAll_UserInventories();
        let filteredItems = [...allItems.filter(y => y.user_ID == UserEntity.ID)];
        return filteredItems;
    }
};
__decorate([
    (0, graphql_1.Query)(() => userauth_entity_1.UserEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserEntityResolver.prototype, "user_info", null);
__decorate([
    (0, graphql_1.ResolveField)(() => media_entity_1.MediaListEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userauth_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserEntityResolver.prototype, "user_avatar", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userauth_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserEntityResolver.prototype, "user_private_answers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userauth_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserEntityResolver.prototype, "user_level", null);
__decorate([
    (0, graphql_1.ResolveField)(() => defaultconfig_entity_1.DefaultConfigEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntityResolver.prototype, "defaultconfig", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userauth_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserEntityResolver.prototype, "levelup_points", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [userinventory_entity_1.UserInventoryEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userauth_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserEntityResolver.prototype, "user_inventory", null);
UserEntityResolver = __decorate([
    (0, graphql_1.Resolver)(() => userauth_entity_1.UserEntity),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        fetch_data_service_1.FetchDataService])
], UserEntityResolver);
exports.UserEntityResolver = UserEntityResolver;
//# sourceMappingURL=userauth.resolver.js.map