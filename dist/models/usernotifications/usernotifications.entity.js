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
exports.UserNotification_Types = exports.UserNotificationEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
const typeorm_1 = require("typeorm");
let UserNotificationEntity = class UserNotificationEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], UserNotificationEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], UserNotificationEntity.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.GraphQLJSONObject),
    (0, typeorm_1.Column)({ type: "json" }),
    __metadata("design:type", Object)
], UserNotificationEntity.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], UserNotificationEntity.prototype, "secret", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], UserNotificationEntity.prototype, "notification_date", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "integer", array: true }),
    __metadata("design:type", Array)
], UserNotificationEntity.prototype, "user_IDs", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, typeorm_1.Column)({ type: "integer", array: true, default: [] }),
    __metadata("design:type", Array)
], UserNotificationEntity.prototype, "deletion_allowed", void 0);
UserNotificationEntity = __decorate([
    (0, typeorm_1.Entity)('user_notifications'),
    (0, graphql_1.ObjectType)()
], UserNotificationEntity);
exports.UserNotificationEntity = UserNotificationEntity;
var UserNotification_Types;
(function (UserNotification_Types) {
    UserNotification_Types["user_answer"] = "user_answer";
    UserNotification_Types["review_isLiked"] = "review_isLiked";
    UserNotification_Types["answer_isReviewed"] = "answer_isReviewed";
    UserNotification_Types["answer_isReported"] = "answer_isReported";
    UserNotification_Types["answerer_isPunished"] = "answerer_isPunished";
    UserNotification_Types["user_answer_reporter_isPunished"] = "useranswer_reporter_isPunished";
    UserNotification_Types["useranswer_review_isReported"] = "useranswer_review_isReported";
    UserNotification_Types["useranswer_reviewer_isPunished"] = "useranswer_reviewer_isPunished";
    UserNotification_Types["useranswer_review_Reporter_isPunished"] = "useranswer_review_Reporter_isPunished";
    UserNotification_Types["questionProduct_isReported"] = "questionProduct_isReported";
    UserNotification_Types["questionAuthor_isPunished"] = "questionAuthor_isPunished";
    UserNotification_Types["questionProduct_Reporter_isPunished"] = "questionProduct_Reporter_isPunished";
    UserNotification_Types["QA_QuestionItem_isReported"] = "QA_QuestionItem_isReported";
    UserNotification_Types["QA_QuestionAuthor_isPunished"] = "QA_QuestionAuthor_isPunished";
    UserNotification_Types["QA_QuestionItem_Reporter_isPunished"] = "QA_QuestionItem_Reporter_isPunished";
    UserNotification_Types["QA_AnswerItem_isReported"] = "QA_AnswerItem_isReported";
    UserNotification_Types["QA_AnswerAuthor_isPunished"] = "QA_AnswerAuthor_isPunished";
    UserNotification_Types["QA_AnswerItem_Reporter_isPunished"] = "QA_AnswerItem_Reporter_isPunished";
})(UserNotification_Types = exports.UserNotification_Types || (exports.UserNotification_Types = {}));
//# sourceMappingURL=usernotifications.entity.js.map