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
exports.QuestionMarket_UserAnswerResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_2 = require("graphql");
const graphql_type_json_1 = require("graphql-type-json");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const user_authentication_service_1 = require("../../controllers/user-authentication/user-authentication.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const typeorm_2 = require("typeorm");
const media_entity_1 = require("../media/media.entity");
const useranswer_review_entity_1 = require("../useranswer_review/useranswer_review.entity");
const usernotifications_entity_1 = require("../usernotifications/usernotifications.entity");
const questionmarket_useranswer_entity_1 = require("./questionmarket_useranswer.entity");
let QuestionMarket_UserAnswerResolver = class QuestionMarket_UserAnswerResolver {
    constructor(questionmarketService, mediaListRepository, cacheManager, useranswerRepository, useranswerReviewRepository, usernotificationRepository, userAuthService) {
        this.questionmarketService = questionmarketService;
        this.mediaListRepository = mediaListRepository;
        this.cacheManager = cacheManager;
        this.useranswerRepository = useranswerRepository;
        this.useranswerReviewRepository = useranswerReviewRepository;
        this.usernotificationRepository = usernotificationRepository;
        this.userAuthService = userAuthService;
    }
    async answer_imgs(user, QuestionMarket_UserAnswerEntity) {
        let _cache = await this.questionmarketService.getalluseranswerIMG();
        let _data = [..._cache.filter(y => y.parent_ID == QuestionMarket_UserAnswerEntity.ID)];
        return _data;
    }
    async answer_is_outdated(user, QuestionMarket_UserAnswerEntity) {
        let now = new Date();
        let _oldtime = new Date(QuestionMarket_UserAnswerEntity.answer_date);
        let _minus = now.getTime() - _oldtime.getTime();
        let ratio = _minus / (5 * 86400 * 1000);
        if (ratio >= 1 && !QuestionMarket_UserAnswerEntity.is_reviewed && !QuestionMarket_UserAnswerEntity.is_reported) {
            return true;
        }
        else {
            return false;
        }
    }
    async delete_single_user_answer(user, answer_ID) {
        return await this.questionmarketService.deleteSingleUserAnswerByID(answer_ID, user.user_id);
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [media_entity_1.MediaListEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity]),
    __metadata("design:returntype", Promise)
], QuestionMarket_UserAnswerResolver.prototype, "answer_imgs", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_2.GraphQLBoolean),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity]),
    __metadata("design:returntype", Promise)
], QuestionMarket_UserAnswerResolver.prototype, "answer_is_outdated", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.default),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Args)('answer_ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], QuestionMarket_UserAnswerResolver.prototype, "delete_single_user_answer", null);
QuestionMarket_UserAnswerResolver = __decorate([
    (0, graphql_1.Resolver)(() => questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity),
    __param(1, (0, typeorm_1.InjectRepository)(media_entity_1.MediaListEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(3, (0, typeorm_1.InjectRepository)(questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(useranswer_review_entity_1.UserAnswerReviewEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        typeorm_2.Repository, Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_authentication_service_1.UserAuthenticationService])
], QuestionMarket_UserAnswerResolver);
exports.QuestionMarket_UserAnswerResolver = QuestionMarket_UserAnswerResolver;
//# sourceMappingURL=questionmarket_useranswer.resolver.js.map