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
exports.QuestionMarket_UserAnswerEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
const media_entity_1 = require("../media/media.entity");
let QuestionMarket_UserAnswerEntity = class QuestionMarket_UserAnswerEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarket_UserAnswerEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], QuestionMarket_UserAnswerEntity.prototype, "answer_content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarket_UserAnswerEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarket_UserAnswerEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], QuestionMarket_UserAnswerEntity.prototype, "is_reviewed", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuestionMarket_UserAnswerEntity.prototype, "answer_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLBoolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], QuestionMarket_UserAnswerEntity.prototype, "answer_is_outdated", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], QuestionMarket_UserAnswerEntity.prototype, "review_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "json", default: [] }),
    __metadata("design:type", Array)
], QuestionMarket_UserAnswerEntity.prototype, "waiting_reviewers", void 0);
__decorate([
    (0, graphql_1.Field)(() => [media_entity_1.MediaListEntity], { nullable: true }),
    __metadata("design:type", Array)
], QuestionMarket_UserAnswerEntity.prototype, "answer_imgs", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], QuestionMarket_UserAnswerEntity.prototype, "is_reported", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", default: "" }),
    __metadata("design:type", String)
], QuestionMarket_UserAnswerEntity.prototype, "report_notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], QuestionMarket_UserAnswerEntity.prototype, "report_sender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], QuestionMarket_UserAnswerEntity.prototype, "report_counter", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], QuestionMarket_UserAnswerEntity.prototype, "reported_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "json", default: [] }),
    __metadata("design:type", Array)
], QuestionMarket_UserAnswerEntity.prototype, "report_controllers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", default: "publish" }),
    __metadata("design:type", String)
], QuestionMarket_UserAnswerEntity.prototype, "answer_status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], QuestionMarket_UserAnswerEntity.prototype, "author_isBlocked", void 0);
QuestionMarket_UserAnswerEntity = __decorate([
    (0, typeorm_1.Entity)('questionmarket_user_answers'),
    (0, graphql_1.ObjectType)()
], QuestionMarket_UserAnswerEntity);
exports.QuestionMarket_UserAnswerEntity = QuestionMarket_UserAnswerEntity;
//# sourceMappingURL=questionmarket_useranswer.entity.js.map