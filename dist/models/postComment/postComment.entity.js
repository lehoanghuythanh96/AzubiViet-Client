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
exports.PostCommentEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../post/post.entity");
let PostCommentEntity = class PostCommentEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], PostCommentEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], PostCommentEntity.prototype, "comment_content", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", String)
], PostCommentEntity.prototype, "user_id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], PostCommentEntity.prototype, "comment_date", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", String)
], PostCommentEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], PostCommentEntity.prototype, "post_type", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    (0, typeorm_1.Column)({ type: "integer", array: true, default: [] }),
    __metadata("design:type", Array)
], PostCommentEntity.prototype, "liked_users", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text", default: "publish" }),
    __metadata("design:type", String)
], PostCommentEntity.prototype, "comment_status", void 0);
PostCommentEntity = __decorate([
    (0, typeorm_1.Entity)('Azubi_post_Comments'),
    (0, graphql_1.ObjectType)()
], PostCommentEntity);
exports.PostCommentEntity = PostCommentEntity;
//# sourceMappingURL=postComment.entity.js.map