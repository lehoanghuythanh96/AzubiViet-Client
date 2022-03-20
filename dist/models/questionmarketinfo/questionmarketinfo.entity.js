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
exports.QuestionMarketInfoEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const arealist_entity_1 = require("../arealist/arealist.entity");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const shopitem_entity_1 = require("../ShopItem/shopitem.entity");
const useranswer_review_entity_1 = require("../useranswer_review/useranswer_review.entity");
let QuestionMarketInfoEntity = class QuestionMarketInfoEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], QuestionMarketInfoEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(() => [arealist_entity_1.AreaListEntity]),
    __metadata("design:type", Array)
], QuestionMarketInfoEntity.prototype, "product_tree", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", defaultconfig_entity_1.DefaultConfigEntity)
], QuestionMarketInfoEntity.prototype, "defaultconfig", void 0);
__decorate([
    (0, graphql_1.Field)(() => [useranswer_review_entity_1.UserAnswerReviewEntity], { nullable: true }),
    __metadata("design:type", Array)
], QuestionMarketInfoEntity.prototype, "answer_reviews", void 0);
__decorate([
    (0, graphql_1.Field)(() => [shopitem_entity_1.ShopItemEntity], { nullable: true }),
    __metadata("design:type", Array)
], QuestionMarketInfoEntity.prototype, "shop_items", void 0);
QuestionMarketInfoEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], QuestionMarketInfoEntity);
exports.QuestionMarketInfoEntity = QuestionMarketInfoEntity;
//# sourceMappingURL=questionmarketinfo.entity.js.map