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
exports.UpdateFormUploadMediaInput = exports.FormUploadMediaInput = exports.GetmediaInput = exports.MediaListEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let MediaListEntity = class MediaListEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], MediaListEntity.prototype, "ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 125 }),
    __metadata("design:type", String)
], MediaListEntity.prototype, "media_name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], MediaListEntity.prototype, "media_type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], MediaListEntity.prototype, "media_path", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], MediaListEntity.prototype, "user_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: 0, type: "integer" }),
    __metadata("design:type", Number)
], MediaListEntity.prototype, "parent_ID", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], MediaListEntity.prototype, "media_created_time", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], MediaListEntity.prototype, "media_category", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ default: "trash", length: 32 }),
    __metadata("design:type", String)
], MediaListEntity.prototype, "media_status", void 0);
MediaListEntity = __decorate([
    (0, typeorm_1.Entity)('azubiviet_media'),
    (0, graphql_1.ObjectType)()
], MediaListEntity);
exports.MediaListEntity = MediaListEntity;
let GetmediaInput = class GetmediaInput {
};
GetmediaInput = __decorate([
    (0, graphql_1.InputType)()
], GetmediaInput);
exports.GetmediaInput = GetmediaInput;
let FormUploadMediaInput = class FormUploadMediaInput {
};
FormUploadMediaInput = __decorate([
    (0, graphql_1.InputType)()
], FormUploadMediaInput);
exports.FormUploadMediaInput = FormUploadMediaInput;
let UpdateFormUploadMediaInput = class UpdateFormUploadMediaInput {
};
UpdateFormUploadMediaInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateFormUploadMediaInput);
exports.UpdateFormUploadMediaInput = UpdateFormUploadMediaInput;
//# sourceMappingURL=media.entity.js.map