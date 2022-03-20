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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInfoResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const lesson_handler_service_1 = require("../../controllers/lesson-handler/lesson-handler.service");
const user_authentication_service_1 = require("../../controllers/user-authentication/user-authentication.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const arealist_entity_1 = require("../arealist/arealist.entity");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const lessoncategory_entity_1 = require("../lessoncategory/lessoncategory.entity");
const post_entity_1 = require("../post/post.entity");
const reportlogger_entity_1 = require("../reportLogger/reportlogger.entity");
const admininfo_entity_1 = require("./admininfo.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let AdminInfoResolver = class AdminInfoResolver {
    constructor(_fetchdataService, _lessonhandlerService, _userauthService) {
        this._fetchdataService = _fetchdataService;
        this._lessonhandlerService = _lessonhandlerService;
        this._userauthService = _userauthService;
    }
    async admininfo(user) {
        await this._fetchdataService.deleteall_unused_cdnfiles(user);
        let _allusers = await this._userauthService.getallusers();
        let _data = _allusers.filter(y => y.user_email == user.user_email)[0];
        if (_data) {
            return _data;
        }
        else {
            return new common_1.BadRequestException({
                message: "User not found"
            });
        }
    }
    async lessons() {
        return await this._lessonhandlerService.getallpubliclesson();
    }
    async arealist() {
        return await this._fetchdataService.getallarea();
    }
    async lessoncatlist() {
        return await this._lessonhandlerService.getall_lessoncategory();
    }
    async report_loggers() {
        return await this._userauthService.getallReportLogger();
    }
    defaultconfig() {
        let _config = {
            postimg_path: config.POST_IMG_PATH,
            default_post_avatar: config.DEFAULT_POST_AVATAR,
            userimg_path: config.USER_IMG_PATH,
            shopitem_img_path: config.SHOPITEM_IMG_PATH,
            QA_img_path: config.QA_IMG_PATH
        };
        return _config;
    }
};
__decorate([
    (0, graphql_1.Query)(() => admininfo_entity_1.AdminInfoEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminInfoResolver.prototype, "admininfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [post_entity_1.PostEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminInfoResolver.prototype, "lessons", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [arealist_entity_1.AreaListEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminInfoResolver.prototype, "arealist", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [lessoncategory_entity_1.LessonCategoryEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminInfoResolver.prototype, "lessoncatlist", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [reportlogger_entity_1.ReportLoggerEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminInfoResolver.prototype, "report_loggers", null);
__decorate([
    (0, graphql_1.ResolveField)(() => defaultconfig_entity_1.DefaultConfigEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminInfoResolver.prototype, "defaultconfig", null);
AdminInfoResolver = __decorate([
    (0, graphql_1.Resolver)(() => admininfo_entity_1.AdminInfoEntity),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        lesson_handler_service_1.LessonHandlerService,
        user_authentication_service_1.UserAuthenticationService])
], AdminInfoResolver);
exports.AdminInfoResolver = AdminInfoResolver;
//# sourceMappingURL=admininfo.resolver.js.map