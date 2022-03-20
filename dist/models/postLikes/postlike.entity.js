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
exports.PostLikeTypes = exports.PostLikeEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let PostLikeEntity = class PostLikeEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], PostLikeEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], PostLikeEntity.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], PostLikeEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    (0, typeorm_1.Column)({ type: "integer", array: true }),
    __metadata("design:type", Array)
], PostLikeEntity.prototype, "user_array", void 0);
PostLikeEntity = __decorate([
    (0, typeorm_1.Entity)('azubivie_postLikes'),
    (0, graphql_1.ObjectType)()
], PostLikeEntity);
exports.PostLikeEntity = PostLikeEntity;
var PostLikeTypes;
(function (PostLikeTypes) {
    PostLikeTypes["QA_Answer"] = "QA_Answer";
})(PostLikeTypes = exports.PostLikeTypes || (exports.PostLikeTypes = {}));
//# sourceMappingURL=postlike.entity.js.map