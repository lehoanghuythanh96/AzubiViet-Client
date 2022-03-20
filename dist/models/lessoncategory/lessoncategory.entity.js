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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonCategoryEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post/post.entity");
let LessonCategoryEntity = class LessonCategoryEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], LessonCategoryEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], LessonCategoryEntity.prototype, "category_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], LessonCategoryEntity.prototype, "area_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => [post_entity_1.PostEntity]),
    __metadata("design:type", Array)
], LessonCategoryEntity.prototype, "child_lessons", void 0);
LessonCategoryEntity = __decorate([
    (0, typeorm_1.Entity)('lesson_categories'),
    (0, graphql_1.ObjectType)()
], LessonCategoryEntity);
exports.LessonCategoryEntity = LessonCategoryEntity;
//# sourceMappingURL=lessoncategory.entity.js.map