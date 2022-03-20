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
exports.AreaListResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const lesson_handler_service_1 = require("../../controllers/lesson-handler/lesson-handler.service");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const arealist_entity_1 = require("../arealist/arealist.entity");
const lessoncategory_entity_1 = require("../lessoncategory/lessoncategory.entity");
const questionproductcategory_entity_1 = require("../questionproductcategory/questionproductcategory.entity");
let AreaListResolver = class AreaListResolver {
    constructor(_questionmarketService, _lessonhandlerService) {
        this._questionmarketService = _questionmarketService;
        this._lessonhandlerService = _lessonhandlerService;
    }
    async child_category_lesson(AreaListEntity) {
        let _cache = await this._lessonhandlerService.getall_lessoncategory();
        let _data = _cache.filter(y => y.area_ID == AreaListEntity.ID);
        if (_data) {
            return _data;
        }
        else {
            return new common_1.BadRequestException({ message: "Lesson categories by area ID not found" });
        }
    }
    async child_category_questionproduct(AreaListEntity) {
        let _cache = await this._questionmarketService.getall_questionproductcategory();
        let _data = _cache.filter(y => y.area_ID == AreaListEntity.ID);
        return _data;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [lessoncategory_entity_1.LessonCategoryEntity]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [arealist_entity_1.AreaListEntity]),
    __metadata("design:returntype", Promise)
], AreaListResolver.prototype, "child_category_lesson", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [questionproductcategory_entity_1.QuestionProductCategoryEntity]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [arealist_entity_1.AreaListEntity]),
    __metadata("design:returntype", Promise)
], AreaListResolver.prototype, "child_category_questionproduct", null);
AreaListResolver = __decorate([
    (0, graphql_1.Resolver)(() => arealist_entity_1.AreaListEntity),
    __metadata("design:paramtypes", [question_market_service_1.QuestionMarketService,
        lesson_handler_service_1.LessonHandlerService])
], AreaListResolver);
exports.AreaListResolver = AreaListResolver;
//# sourceMappingURL=arealist.resolver.js.map