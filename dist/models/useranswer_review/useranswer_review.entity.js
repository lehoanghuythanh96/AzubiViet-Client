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
exports.UserAnswerReviewEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post/post.entity");
let UserAnswerReviewEntity = class UserAnswerReviewEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "correctness", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], UserAnswerReviewEntity.prototype, "review_content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "answerer_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "user_answer_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "question_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.GraphQLJSONObject),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", post_entity_1.PostEntity)
], UserAnswerReviewEntity.prototype, "question_info", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserAnswerReviewEntity.prototype, "review_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "review_author", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "review_confirmation", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "original_answer_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.GraphQLJSONObject),
    (0, typeorm_1.Column)({ type: "json", default: {} }),
    __metadata("design:type", Object)
], UserAnswerReviewEntity.prototype, "original_answer_info", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "review_updated", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "review_fixed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "is_reported", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", default: "" }),
    __metadata("design:type", String)
], UserAnswerReviewEntity.prototype, "report_notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "report_sender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], UserAnswerReviewEntity.prototype, "report_counter", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserAnswerReviewEntity.prototype, "reported_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "json", default: [] }),
    __metadata("design:type", Array)
], UserAnswerReviewEntity.prototype, "report_controllers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "review_confirmed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "review_isLiked", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", default: "publish" }),
    __metadata("design:type", String)
], UserAnswerReviewEntity.prototype, "review_status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], UserAnswerReviewEntity.prototype, "author_isBlocked", void 0);
UserAnswerReviewEntity = __decorate([
    (0, typeorm_1.Entity)('user_answer_reviews'),
    (0, graphql_1.ObjectType)()
], UserAnswerReviewEntity);
exports.UserAnswerReviewEntity = UserAnswerReviewEntity;
//# sourceMappingURL=useranswer_review.entity.js.map