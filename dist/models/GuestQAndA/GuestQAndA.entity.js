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
exports.GuestQAndAEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const media_entity_1 = require("../media/media.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let GuestQAndAEntity = class GuestQAndAEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], GuestQAndAEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "item_content", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "user_email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], GuestQAndAEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], GuestQAndAEntity.prototype, "question_date", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], GuestQAndAEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "item_type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text", default: "publish" }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "item_status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text", default: "Waiting" }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "QA_status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], GuestQAndAEntity.prototype, "like_arr", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], GuestQAndAEntity.prototype, "is_reported", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text", default: "" }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "report_notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], GuestQAndAEntity.prototype, "report_sender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer", default: 0 }),
    __metadata("design:type", Number)
], GuestQAndAEntity.prototype, "report_counter", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], GuestQAndAEntity.prototype, "reported_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "json", default: [] }),
    __metadata("design:type", Array)
], GuestQAndAEntity.prototype, "report_controllers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], GuestQAndAEntity.prototype, "author_isBlocked", void 0);
__decorate([
    (0, graphql_1.Field)(() => [media_entity_1.MediaListEntity], { nullable: true }),
    __metadata("design:type", Array)
], GuestQAndAEntity.prototype, "QA_imgs", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { defaultValue: config.QA_IMG_PATH }),
    __metadata("design:type", String)
], GuestQAndAEntity.prototype, "QA_img_path", void 0);
GuestQAndAEntity = __decorate([
    (0, typeorm_1.Entity)('Guest_QAndA_Items'),
    (0, graphql_1.ObjectType)()
], GuestQAndAEntity);
exports.GuestQAndAEntity = GuestQAndAEntity;
//# sourceMappingURL=GuestQAndA.entity.js.map