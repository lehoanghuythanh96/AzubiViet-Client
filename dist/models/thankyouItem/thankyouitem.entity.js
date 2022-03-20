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
exports.ThankYouItemTypes = exports.ThankYouItemEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
const typeorm_1 = require("typeorm");
let ThankYouItemEntity = class ThankYouItemEntity {
};
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], ThankYouItemEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ThankYouItemEntity.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", String)
], ThankYouItemEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Array)
], ThankYouItemEntity.prototype, "thankyou_list", void 0);
ThankYouItemEntity = __decorate([
    (0, typeorm_1.Entity)('ThankYouList'),
    (0, graphql_1.ObjectType)()
], ThankYouItemEntity);
exports.ThankYouItemEntity = ThankYouItemEntity;
var ThankYouItemTypes;
(function (ThankYouItemTypes) {
    ThankYouItemTypes["QA_Answer"] = "QA_Answer";
})(ThankYouItemTypes = exports.ThankYouItemTypes || (exports.ThankYouItemTypes = {}));
//# sourceMappingURL=thankyouitem.entity.js.map