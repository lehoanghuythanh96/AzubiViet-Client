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
exports.QuestionMarketInfoResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const user_authentication_service_1 = require("../../controllers/user-authentication/user-authentication.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const typeorm_2 = require("typeorm");
const arealist_entity_1 = require("../arealist/arealist.entity");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const useranswer_review_entity_1 = require("../useranswer_review/useranswer_review.entity");
const userauth_entity_1 = require("../userauthentication/userauth.entity");
const questionmarketinfo_entity_1 = require("./questionmarketinfo.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let QuestionMarketInfoResolver = class QuestionMarketInfoResolver {
    constructor(_fetchdataService, _userauthService, QuestionMarketInfoRepository, _questionMarketService) {
        this._fetchdataService = _fetchdataService;
        this._userauthService = _userauthService;
        this.QuestionMarketInfoRepository = QuestionMarketInfoRepository;
        this._questionMarketService = _questionMarketService;
    }
    async questionmarketinfo(user) {
        await this._fetchdataService.deleteall_unused_cdnfiles(user);
        let _result = await this.QuestionMarketInfoRepository.find();
        return _result;
    }
    async product_tree(user) {
        return this._fetchdataService.getallarea();
    }
    async answer_reviews(user) {
        let _cache = await this._questionMarketService.getAllUserAnswerReviews();
        let _data = _cache.filter(y => (y.answerer_ID == user.user_id && y.review_status == "publish") || (y.is_reported == true && y.report_controllers.includes(user.user_id)) || y.review_author == user.user_id);
        return _data;
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
    async userinfo(user) {
        let _allusers = await this._userauthService.getallusers();
        let _result = _allusers.find(y => y.ID == user.user_id);
        return _result;
    }
    async shop_items(user) {
        let allItems = await this._fetchdataService.getAll_ShopItems();
        return allItems;
    }
};
__decorate([
    (0, graphql_1.Query)(() => questionmarketinfo_entity_1.QuestionMarketInfoEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionMarketInfoResolver.prototype, "questionmarketinfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [arealist_entity_1.AreaListEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionMarketInfoResolver.prototype, "product_tree", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [useranswer_review_entity_1.UserAnswerReviewEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionMarketInfoResolver.prototype, "answer_reviews", null);
__decorate([
    (0, graphql_1.ResolveField)(() => defaultconfig_entity_1.DefaultConfigEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionMarketInfoResolver.prototype, "defaultconfig", null);
__decorate([
    (0, graphql_1.ResolveField)(() => userauth_entity_1.UserEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionMarketInfoResolver.prototype, "userinfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => userauth_entity_1.UserEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionMarketInfoResolver.prototype, "shop_items", null);
QuestionMarketInfoResolver = __decorate([
    (0, graphql_1.Resolver)(() => questionmarketinfo_entity_1.QuestionMarketInfoEntity),
    __param(2, (0, typeorm_1.InjectRepository)(questionmarketinfo_entity_1.QuestionMarketInfoEntity)),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository,
        question_market_service_1.QuestionMarketService])
], QuestionMarketInfoResolver);
exports.QuestionMarketInfoResolver = QuestionMarketInfoResolver;
//# sourceMappingURL=questionmarketinfo.resolver.js.map