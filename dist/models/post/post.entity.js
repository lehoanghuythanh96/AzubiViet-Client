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
exports.postTypes = exports.PostEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const media_entity_1 = require("../media/media.entity");
const questionmarketanswer_entity_1 = require("../questionmarketanswer/questionmarketanswer.entity");
const questionmarket_useranswer_entity_1 = require("../QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const userauth_entity_1 = require("../userauthentication/userauth.entity");
let PostEntity = class PostEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], PostEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], PostEntity.prototype, "post_title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], PostEntity.prototype, "post_content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], PostEntity.prototype, "post_author", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PostEntity.prototype, "post_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 55 }),
    __metadata("design:type", String)
], PostEntity.prototype, "post_type", void 0);
__decorate([
    (0, graphql_1.Field)(Type => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "integer", default: [], array: true }),
    __metadata("design:type", Array)
], PostEntity.prototype, "post_category", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 3 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "question_experience", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 55, default: "draft" }),
    __metadata("design:type", String)
], PostEntity.prototype, "post_status", void 0);
__decorate([
    (0, graphql_1.Field)(() => media_entity_1.MediaListEntity, { nullable: true }),
    __metadata("design:type", media_entity_1.MediaListEntity)
], PostEntity.prototype, "post_avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => questionmarketanswer_entity_1.QuestionMarketAnswerEntity, { nullable: true }),
    __metadata("design:type", questionmarketanswer_entity_1.QuestionMarketAnswerEntity)
], PostEntity.prototype, "question_answer", void 0);
__decorate([
    (0, graphql_1.Field)(() => [media_entity_1.MediaListEntity], { nullable: true }),
    __metadata("design:type", Array)
], PostEntity.prototype, "question_imgs", void 0);
__decorate([
    (0, graphql_1.Field)(() => media_entity_1.MediaListEntity, { nullable: true }),
    __metadata("design:type", media_entity_1.MediaListEntity)
], PostEntity.prototype, "question_avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => media_entity_1.MediaListEntity, { nullable: true }),
    __metadata("design:type", media_entity_1.MediaListEntity)
], PostEntity.prototype, "lesson_avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => userauth_entity_1.UserEntity, { nullable: true }),
    __metadata("design:type", userauth_entity_1.UserEntity)
], PostEntity.prototype, "author_info", void 0);
__decorate([
    (0, graphql_1.Field)(() => [questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity], { nullable: true }),
    __metadata("design:type", Array)
], PostEntity.prototype, "questionmarket_user_answer", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], PostEntity.prototype, "is_reported", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", default: "" }),
    __metadata("design:type", String)
], PostEntity.prototype, "report_notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "report_sender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], PostEntity.prototype, "report_counter", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PostEntity.prototype, "reported_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "json", default: [] }),
    __metadata("design:type", Array)
], PostEntity.prototype, "report_controllers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], PostEntity.prototype, "author_isBlocked", void 0);
PostEntity = __decorate([
    (0, typeorm_1.Entity)('azb_posts'),
    (0, graphql_1.ObjectType)()
], PostEntity);
exports.PostEntity = PostEntity;
var postTypes;
(function (postTypes) {
    postTypes["post"] = "post";
    postTypes["lesson"] = "lesson";
    postTypes["question_product"] = "question_product";
})(postTypes = exports.postTypes || (exports.postTypes = {}));
//# sourceMappingURL=post.entity.js.map