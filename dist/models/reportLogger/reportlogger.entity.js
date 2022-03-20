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
exports.ReportLoggerTypes = exports.ReportLoggerEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let ReportLoggerEntity = class ReportLoggerEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], ReportLoggerEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ReportLoggerEntity.prototype, "report_notes", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ReportLoggerEntity.prototype, "report_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], ReportLoggerEntity.prototype, "report_sender", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "integer", array: true }),
    __metadata("design:type", Array)
], ReportLoggerEntity.prototype, "report_controllers", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], ReportLoggerEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ReportLoggerEntity.prototype, "report_type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], ReportLoggerEntity.prototype, "finished", void 0);
ReportLoggerEntity = __decorate([
    (0, typeorm_1.Entity)('azubi_ReportLogger'),
    (0, graphql_1.ObjectType)()
], ReportLoggerEntity);
exports.ReportLoggerEntity = ReportLoggerEntity;
var ReportLoggerTypes;
(function (ReportLoggerTypes) {
    ReportLoggerTypes["questionMarketUserAnswer"] = "questionMarketUserAnswer";
    ReportLoggerTypes["questionMarket_UserAnswerReview"] = "questionMarket_UserAnswerReview";
    ReportLoggerTypes["questionProduct_Invalid"] = "questionProduct_Invalid";
    ReportLoggerTypes["QA_Question_ItemInvalid"] = "QA_Question_ItemInvalid";
    ReportLoggerTypes["QA_Answer_ItemInvalid"] = "QA_Answer_ItemInvalid";
    ReportLoggerTypes["useranswer_expired"] = "useranswer_expired";
})(ReportLoggerTypes = exports.ReportLoggerTypes || (exports.ReportLoggerTypes = {}));
//# sourceMappingURL=reportlogger.entity.js.map