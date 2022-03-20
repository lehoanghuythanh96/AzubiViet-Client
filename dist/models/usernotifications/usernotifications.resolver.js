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
exports.UserNotificationResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const user_authentication_service_1 = require("../../controllers/user-authentication/user-authentication.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const typeorm_2 = require("typeorm");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const usernotifications_entity_1 = require("./usernotifications.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let UserNotificationResolver = class UserNotificationResolver {
    constructor(_userauthService, _userNotificationRepository, cacheManager) {
        this._userauthService = _userauthService;
        this._userNotificationRepository = _userNotificationRepository;
        this.cacheManager = cacheManager;
    }
    async user_notifications(user) {
        let _allnoti = await this._userauthService.getallusernotifications();
        let _usernotis = _allnoti.filter(y => y.user_IDs.includes(user.user_id));
        return _usernotis;
    }
    async delete_single_notification(user, notification_ID) {
        let _result = await this._userauthService.deleteSingleNotiByID(notification_ID, user.user_id);
        return _result;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [usernotifications_entity_1.UserNotificationEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserNotificationResolver.prototype, "user_notifications", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_1.Float),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Args)('notification_ID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserNotificationResolver.prototype, "delete_single_notification", null);
UserNotificationResolver = __decorate([
    (0, graphql_1.Resolver)(() => usernotifications_entity_1.UserNotificationEntity),
    __param(1, (0, typeorm_1.InjectRepository)(usernotifications_entity_1.UserNotificationEntity)),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [user_authentication_service_1.UserAuthenticationService,
        typeorm_2.Repository, Object])
], UserNotificationResolver);
exports.UserNotificationResolver = UserNotificationResolver;
//# sourceMappingURL=usernotifications.resolver.js.map