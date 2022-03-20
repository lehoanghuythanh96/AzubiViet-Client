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
exports.QuestionMarketAnswerEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const media_entity_1 = require("../media/media.entity");
let QuestionMarketAnswerEntity = class QuestionMarketAnswerEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarketAnswerEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], QuestionMarketAnswerEntity.prototype, "answer_content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarketAnswerEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarketAnswerEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => [media_entity_1.MediaListEntity], { nullable: true }),
    __metadata("design:type", Array)
], QuestionMarketAnswerEntity.prototype, "answer_imgs", void 0);
QuestionMarketAnswerEntity = __decorate([
    (0, typeorm_1.Entity)('questionmarket_answers'),
    (0, graphql_1.ObjectType)()
], QuestionMarketAnswerEntity);
exports.QuestionMarketAnswerEntity = QuestionMarketAnswerEntity;
//# sourceMappingURL=questionmarketanswer.entity.js.map