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
exports.PostEntityResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const lesson_handler_service_1 = require("../../controllers/lesson-handler/lesson-handler.service");
const question_market_service_1 = require("../../controllers/question-market/question-market.service");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const user_decorator_1 = require("../../tools/auth-tools/user.decorator");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const media_entity_1 = require("../media/media.entity");
const post_entity_1 = require("../post/post.entity");
const questionmarketanswer_entity_1 = require("../questionmarketanswer/questionmarketanswer.entity");
const questionmarket_useranswer_entity_1 = require("../QuestionMarket_UserAnswer/questionmarket_useranswer.entity");
const userauth_entity_1 = require("../userauthentication/userauth.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let PostEntityResolver = class PostEntityResolver {
    constructor(fetchDataService, _questionmarketService, _lessonhandlerservice) {
        this.fetchDataService = fetchDataService;
        this._questionmarketService = _questionmarketService;
        this._lessonhandlerservice = _lessonhandlerservice;
    }
    async lesson_avatar(PostEntity) {
        let _cache = await this._lessonhandlerservice.getalllessonavatar();
        let _img = _cache.find(y => y.parent_ID == PostEntity.ID);
        let _name_null = config.DEFAULT_POST_AVATAR;
        let _null = {
            ID: 0,
            media_name: _name_null,
            media_type: "webp",
            media_path: config.POST_IMG_PATH + _name_null,
            user_ID: 0,
            parent_ID: 0,
            media_created_time: undefined,
            media_category: "",
            media_status: "trash"
        };
        if (_img) {
            return _img;
        }
        else {
            return _null;
        }
    }
    async question_avatar(PostEntity) {
        let _cache = await this._questionmarketService.getallquestionproductavatar();
        let _img = _cache.find(y => y.parent_ID == PostEntity.ID);
        let _name_null = config.DEFAULT_POST_AVATAR;
        let _null = {
            ID: 0,
            media_name: _name_null,
            media_type: "webp",
            media_path: config.POST_IMG_PATH + _name_null,
            user_ID: 0,
            parent_ID: 0,
            media_created_time: undefined,
            media_category: "",
            media_status: "trash"
        };
        if (_img && PostEntity.post_type == post_entity_1.postTypes.question_product) {
            return _img;
        }
        else {
            return _null;
        }
    }
    async question_answer(user, PostEntity) {
        let _cache = await this._questionmarketService.getallquestionanswer();
        let _data = _cache.find(y => y.parent_ID == PostEntity.ID && y.user_ID == user.user_id);
        if (_data) {
            return _data;
        }
        else {
            return null;
        }
    }
    async question_imgs(user, PostEntity) {
        if (PostEntity.post_type == post_entity_1.postTypes.question_product) {
            let _cache = await this._questionmarketService.getallquestionIMG();
            let _data = [..._cache.filter(y => y.parent_ID == PostEntity.ID)];
            return _data;
        }
        else {
            return null;
        }
    }
    async author_info(PostEntity) {
        let _cache = await this.fetchDataService.getallusers();
        let _curruser = Object.assign({}, _cache.find(y => y.ID == PostEntity.post_author));
        let _tempuser = {
            ID: 0,
            user_password: "",
            user_secretcode: "",
            user_email: "",
            levelup_points: 0,
            user_experience: 0,
            user_stat: ""
        };
        _curruser = Object.assign(_curruser, _tempuser);
        return _curruser;
    }
    async questionmarket_user_answer(user, PostEntity) {
        if (PostEntity.post_type == post_entity_1.postTypes.question_product) {
            let _cache = await this._questionmarketService.getalluseranswerinmarket();
            let _data = [..._cache.filter(y => y.parent_ID == PostEntity.ID && y.answer_status == 'publish' && y.author_isBlocked == false)];
            return _data;
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, graphql_1.ResolveField)(() => media_entity_1.MediaListEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostEntityResolver.prototype, "lesson_avatar", null);
__decorate([
    (0, graphql_1.ResolveField)(() => media_entity_1.MediaListEntity),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostEntityResolver.prototype, "question_avatar", null);
__decorate([
    (0, graphql_1.ResolveField)(() => questionmarketanswer_entity_1.QuestionMarketAnswerEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_entity_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostEntityResolver.prototype, "question_answer", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [media_entity_1.MediaListEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_entity_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostEntityResolver.prototype, "question_imgs", null);
__decorate([
    (0, graphql_1.ResolveField)(() => userauth_entity_1.UserEntity),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_entity_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostEntityResolver.prototype, "author_info", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [questionmarket_useranswer_entity_1.QuestionMarket_UserAnswerEntity]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.GqlJwtAuthGuard),
    __param(0, (0, user_decorator_1.JwtCurrentUser)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_entity_1.PostEntity]),
    __metadata("design:returntype", Promise)
], PostEntityResolver.prototype, "questionmarket_user_answer", null);
PostEntityResolver = __decorate([
    (0, graphql_1.Resolver)(() => post_entity_1.PostEntity),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService,
        question_market_service_1.QuestionMarketService,
        lesson_handler_service_1.LessonHandlerService])
], PostEntityResolver);
exports.PostEntityResolver = PostEntityResolver;
//# sourceMappingURL=post.resolver.js.map