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
exports.ChatServerNames = exports.ServerChatEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let ServerChatEntity = class ServerChatEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], ServerChatEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], ServerChatEntity.prototype, "message_content", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ServerChatEntity.prototype, "message_date", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ServerChatEntity.prototype, "server_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], ServerChatEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ServerChatEntity.prototype, "user_email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], ServerChatEntity.prototype, "user_name", void 0);
ServerChatEntity = __decorate([
    (0, typeorm_1.Entity)('azuBi_ServerChat'),
    (0, graphql_1.ObjectType)()
], ServerChatEntity);
exports.ServerChatEntity = ServerChatEntity;
var ChatServerNames;
(function (ChatServerNames) {
    ChatServerNames["justDoIt"] = "Just Do It";
    ChatServerNames["workHardPlayHard"] = "Work Hard Play Hard";
    ChatServerNames["beYourSelf"] = "Be Your Self";
    ChatServerNames["nothingMatters"] = "Nothing Matters";
})(ChatServerNames = exports.ChatServerNames || (exports.ChatServerNames = {}));
//# sourceMappingURL=serverchat.entity.js.map