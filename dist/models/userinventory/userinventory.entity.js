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
exports.UserInventoryEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let UserInventoryEntity = class UserInventoryEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], UserInventoryEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserInventoryEntity.prototype, "item_quantity", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    __metadata("design:type", String)
], UserInventoryEntity.prototype, "item_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], UserInventoryEntity.prototype, "item_code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], UserInventoryEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    __metadata("design:type", String)
], UserInventoryEntity.prototype, "item_avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { nullable: true }),
    __metadata("design:type", String)
], UserInventoryEntity.prototype, "item_description", void 0);
UserInventoryEntity = __decorate([
    (0, typeorm_1.Entity)('azubi_userInventory'),
    (0, graphql_1.ObjectType)()
], UserInventoryEntity);
exports.UserInventoryEntity = UserInventoryEntity;
//# sourceMappingURL=userinventory.entity.js.map