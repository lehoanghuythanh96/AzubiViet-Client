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
exports.QuestionMarketAnswerResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const media_entity_1 = require("../media/media.entity");
const questionmarketanswer_entity_1 = require("../questionmarketanswer/questionmarketanswer.entity");
let QuestionMarketAnswerResolver = class QuestionMarketAnswerResolver {
    constructor(questionmarketService) {
        this.questionmarketService = questionmarketService;
    }
    async answer_imgs(user, QuestionMarketAnswerEntity) {
        let _cache = await this.questionmarketService.getallquestionanswerIMG();
        let _data = [..._cache.filter(y => y.parent_ID == QuestionMarketAnswerEntity.ID)];
        return _data;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [media_entity_1.MediaListEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, questionmarketanswer_entity_1.QuestionMarketAnswerEntity]),
    __metadata("design:returntype", Promise)
], QuestionMarketAnswerResolver.prototype, "answer_imgs", null);
QuestionMarketAnswerResolver = __decorate([
    (0, graphql_1.Resolver)(() => questionmarketanswer_entity_1.QuestionMarketAnswerEntity),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService])
], QuestionMarketAnswerResolver);
exports.QuestionMarketAnswerResolver = QuestionMarketAnswerResolver;
//# sourceMappingURL=questionmarketanswer.resolver.js.map