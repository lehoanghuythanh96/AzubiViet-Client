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
exports.MainLandingPageEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const GuestQAndA_entity_1 = require("../GuestQAndA/GuestQAndA.entity");
const post_entity_1 = require("../post/post.entity");
const postComment_entity_1 = require("../postComment/postComment.entity");
let MainLandingPageEntity = class MainLandingPageEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], MainLandingPageEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => [postComment_entity_1.PostCommentEntity]),
    __metadata("design:type", Array)
], MainLandingPageEntity.prototype, "all_comments", void 0);
__decorate([
    (0, graphql_1.Field)(() => [GuestQAndA_entity_1.GuestQAndAEntity]),
    __metadata("design:type", Array)
], MainLandingPageEntity.prototype, "all_QandA", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", defaultconfig_entity_1.DefaultConfigEntity)
], MainLandingPageEntity.prototype, "defaultconfig", void 0);
__decorate([
    (0, graphql_1.Field)(() => [post_entity_1.PostEntity]),
    __metadata("design:type", Array)
], MainLandingPageEntity.prototype, "all_lessons", void 0);
__decorate([
    (0, graphql_1.Field)(() => [post_entity_1.PostEntity]),
    __metadata("design:type", Array)
], MainLandingPageEntity.prototype, "all_questionproducts", void 0);
MainLandingPageEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], MainLandingPageEntity);
exports.MainLandingPageEntity = MainLandingPageEntity;
//# sourceMappingURL=mainLandingPageInfo.entity.js.map