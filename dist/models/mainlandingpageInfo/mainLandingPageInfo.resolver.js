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
exports.MainLandingPageInfoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const lesson_handler_service_1 = require("../../controllers/lesson-handler/lesson-handler.service");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const user_authentication_service_1 = require("../../controllers/user-authentication/user-authentication.service");
const typeorm_2 = require("typeorm");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const GuestQAndA_entity_1 = require("../GuestQAndA/GuestQAndA.entity");
const post_entity_1 = require("../post/post.entity");
const postComment_entity_1 = require("../postComment/postComment.entity");
const mainLandingPageInfo_entity_1 = require("./mainLandingPageInfo.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let MainLandingPageInfoResolver = class MainLandingPageInfoResolver {
    constructor(mainlandingpagerepository, _fetchdataService, lessonhandlerService, questionmarketService, _userauthService) {
        this.mainlandingpagerepository = mainlandingpagerepository;
        this._fetchdataService = _fetchdataService;
        this.lessonhandlerService = lessonhandlerService;
        this.questionmarketService = questionmarketService;
        this._userauthService = _userauthService;
    }
    async mainlandingpageInfo() {
        let _result = await this.mainlandingpagerepository.find();
        return _result;
    }
    async all_comments() {
        return await this._fetchdataService.getAllguestQandA_items();
    }
    async all_QandA() {
        let allQAs = await this._fetchdataService.getAllguestQandA_items();
        return allQAs.filter(y => y.item_status == "publish" && y.author_isBlocked == false);
    }
    async all_lessons() {
        return await this.lessonhandlerService.getallpubliclesson();
    }
    async all_questionproducts() {
        return await this.questionmarketService.getall_questionproduct();
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
    (0, graphql_1.Query)(() => mainLandingPageInfo_entity_1.MainLandingPageEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainLandingPageInfoResolver.prototype, "mainlandingpageInfo", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [postComment_entity_1.PostCommentEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainLandingPageInfoResolver.prototype, "all_comments", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [GuestQAndA_entity_1.GuestQAndAEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainLandingPageInfoResolver.prototype, "all_QandA", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [post_entity_1.PostEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainLandingPageInfoResolver.prototype, "all_lessons", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [post_entity_1.PostEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainLandingPageInfoResolver.prototype, "all_questionproducts", null);
__decorate([
    (0, graphql_1.ResolveField)(() => defaultconfig_entity_1.DefaultConfigEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MainLandingPageInfoResolver.prototype, "defaultconfig", null);
MainLandingPageInfoResolver = __decorate([
    (0, graphql_1.Resolver)(() => mainLandingPageInfo_entity_1.MainLandingPageEntity),
    __param(0, (0, typeorm_1.InjectRepository)(mainLandingPageInfo_entity_1.MainLandingPageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        fetch_data_service_1.FetchDataService,
        lesson_handler_service_1.LessonHandlerService,
        question_market_service_1.QuestionMarketService,
        user_authentication_service_1.UserAuthenticationService])
], MainLandingPageInfoResolver);
exports.MainLandingPageInfoResolver = MainLandingPageInfoResolver;
//# sourceMappingURL=mainLandingPageInfo.resolver.js.map