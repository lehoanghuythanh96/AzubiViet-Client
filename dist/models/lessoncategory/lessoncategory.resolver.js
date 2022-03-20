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
exports.LessonCategoryResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const lesson_handler_service_1 = require("../../controllers/lesson-handler/lesson-handler.service");
const lessoncategory_entity_1 = require("../lessoncategory/lessoncategory.entity");
const post_entity_1 = require("../post/post.entity");
let LessonCategoryResolver = class LessonCategoryResolver {
    constructor(_lessonService) {
        this._lessonService = _lessonService;
    }
    async child_lessons(LessonCategoryEntity) {
        let _cache = await this._lessonService.getallpubliclesson();
        let _data = _cache.filter(y => y.post_category.indexOf(LessonCategoryEntity.ID) >= 0);
        return _data;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => [post_entity_1.PostEntity]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lessoncategory_entity_1.LessonCategoryEntity]),
    __metadata("design:returntype", Promise)
], LessonCategoryResolver.prototype, "child_lessons", null);
LessonCategoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => lessoncategory_entity_1.LessonCategoryEntity),
    __metadata("design:paramtypes", [lesson_handler_service_1.LessonHandlerService])
], LessonCategoryResolver);
exports.LessonCategoryResolver = LessonCategoryResolver;
//# sourceMappingURL=lessoncategory.resolver.js.map