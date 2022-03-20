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
exports.QuestionProductCategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../post/post.entity");
const questionproductcategory_entity_1 = require("./questionproductcategory.entity");
let QuestionProductCategoryResolver = class QuestionProductCategoryResolver {
    constructor(postrepository, _questionmarketService) {
        this.postrepository = postrepository;
        this._questionmarketService = _questionmarketService;
    }
    async child_lessons(QuestionProductCategoryEntity) {
        let _cache = await this._questionmarketService.getall_questionproduct();
        let _data = [..._cache.filter(y => y.post_category.indexOf(QuestionProductCategoryEntity.ID) >= 0 && y.author_isBlocked == false)];
        return _data;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [post_entity_1.PostEntity]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [questionproductcategory_entity_1.QuestionProductCategoryEntity]),
    __metadata("design:returntype", Promise)
], QuestionProductCategoryResolver.prototype, "child_lessons", null);
QuestionProductCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => questionproductcategory_entity_1.QuestionProductCategoryEntity),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        question_market_service_1.QuestionMarketService])
], QuestionProductCategoryResolver);
exports.QuestionProductCategoryResolver = QuestionProductCategoryResolver;
//# sourceMappingURL=questionproductcategory.resolver.js.map