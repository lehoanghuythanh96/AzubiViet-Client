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
exports.ServerChatResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const serverchat_entity_1 = require("./serverchat.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let ServerChatResolver = class ServerChatResolver {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async server_chat_items(server_name, user) {
        let _allMsgs = await this.fetchDataService.getallServerChatItems();
        let _servermsgs = _allMsgs.filter(y => y.server_name == server_name);
        return _servermsgs;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [serverchat_entity_1.ServerChatEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, graphql_1.Args)('server_name')),
    __param(1, (0, user_decorator_1.JwtCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServerChatResolver.prototype, "server_chat_items", null);
ServerChatResolver = __decorate([
    (0, graphql_1.Resolver)(() => [serverchat_entity_1.ServerChatEntity]),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], ServerChatResolver);
exports.ServerChatResolver = ServerChatResolver;
//# sourceMappingURL=serverchat.resolver.js.map