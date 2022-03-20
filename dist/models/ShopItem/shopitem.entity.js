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
exports.ShopItemCodes = exports.ShopItemEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const typeorm_1 = require("typeorm");
let ShopItemEntity = class ShopItemEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "item_code", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "item_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "item_description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], ShopItemEntity.prototype, "item_price", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_2.GraphQLString, { defaultValue: "assets/images/shop_item/" }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "avatar_path", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ShopItemEntity.prototype, "item_avatar", void 0);
ShopItemEntity = __decorate([
    (0, typeorm_1.Entity)('aZubi_ShopItems'),
    (0, graphql_1.ObjectType)()
], ShopItemEntity);
exports.ShopItemEntity = ShopItemEntity;
var ShopItemCodes;
(function (ShopItemCodes) {
    ShopItemCodes["reverseClock"] = "DELR";
    ShopItemCodes["revivalRoll"] = "RIVR";
    ShopItemCodes["reportFighter"] = "RPFT";
})(ShopItemCodes = exports.ShopItemCodes || (exports.ShopItemCodes = {}));
//# sourceMappingURL=shopitem.entity.js.map