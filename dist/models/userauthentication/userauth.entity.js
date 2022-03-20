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
exports.UserGenders = exports.UserRoles = exports.UserEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const media_entity_1 = require("../media/media.entity");
const questionmarket_useranswer_entity_1 = require("../QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const userinventory_entity_1 = require("../userinventory/userinventory.entity");
let UserEntity = class UserEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], UserEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 32 }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255, default: "" }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_secretcode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: "subscriber", length: 32 }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_role", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserEntity.prototype, "user_level", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserEntity.prototype, "levelup_points", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 0, type: "integer" }),
    __metadata("design:type", Number)
], UserEntity.prototype, "user_experience", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 0, type: "integer" }),
    __metadata("design:type", Number)
], UserEntity.prototype, "user_abicoin", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: "", length: 255 }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_stat", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", media_entity_1.MediaListEntity)
], UserEntity.prototype, "user_avatar", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: "Male", length: 10 }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: false, type: "boolean" }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "is_blocked", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 0, type: "integer" }),
    __metadata("design:type", Number)
], UserEntity.prototype, "punish_point", void 0);
__decorate([
    (0, graphql_1.Field)(() => [questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity], { nullable: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_private_answers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", defaultconfig_entity_1.DefaultConfigEntity)
], UserEntity.prototype, "defaultconfig", void 0);
__decorate([
    (0, graphql_1.Field)(() => [userinventory_entity_1.UserInventoryEntity], { nullable: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_inventory", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('azubivie_users'),
    (0, graphql_1.ObjectType)()
], UserEntity);
exports.UserEntity = UserEntity;
var UserRoles;
(function (UserRoles) {
    UserRoles["subscriber"] = "subscriber";
    UserRoles["admin"] = "admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
var UserGenders;
(function (UserGenders) {
    UserGenders["male"] = "male";
    UserGenders["female"] = "female";
})(UserGenders = exports.UserGenders || (exports.UserGenders = {}));
//# sourceMappingURL=userauth.entity.js.map