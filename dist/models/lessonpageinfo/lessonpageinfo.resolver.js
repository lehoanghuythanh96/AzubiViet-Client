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
exports.LessonGuestPageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const lesson_handler_service_1 = require("../../controllers/lesson-handler/lesson-handler.service");
const typeorm_2 = require("typeorm");
const arealist_entity_1 = require("../arealist/arealist.entity");
const nestconfig_interface_1 = require("../config/nestconfig.interface");
const defaultconfig_entity_1 = require("../defaultconfig/defaultconfig.entity");
const post_entity_1 = require("../post/post.entity");
const lessonpageinfo_entity_1 = require("./lessonpageinfo.entity");
let config = nestconfig_interface_1.SystemDefaultConfig;
let LessonGuestPageResolver = class LessonGuestPageResolver {
    constructor(lessonpagerepository, _fetchdataService, lessonhandlerService) {
        this.lessonpagerepository = lessonpagerepository;
        this._fetchdataService = _fetchdataService;
        this.lessonhandlerService = lessonhandlerService;
    }
    async lesson_page() {
        return await this.lessonpagerepository.find();
    }
    async lesson_tree() {
        return await this._fetchdataService.getallarea();
    }
    async all_lessons() {
        return await this.lessonhandlerService.getallpubliclesson();
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
    (0, graphql_1.Query)(() => lessonpageinfo_entity_1.LessonGuestPageEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonGuestPageResolver.prototype, "lesson_page", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [arealist_entity_1.AreaListEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonGuestPageResolver.prototype, "lesson_tree", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [post_entity_1.PostEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LessonGuestPageResolver.prototype, "all_lessons", null);
__decorate([
    (0, graphql_1.ResolveField)(() => defaultconfig_entity_1.DefaultConfigEntity),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LessonGuestPageResolver.prototype, "defaultconfig", null);
LessonGuestPageResolver = __decorate([
    (0, graphql_1.Resolver)(() => lessonpageinfo_entity_1.LessonGuestPageEntity),
    __param(0, (0, typeorm_1.InjectRepository)(lessonpageinfo_entity_1.LessonGuestPageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        fetch_data_service_1.FetchDataService,
        lesson_handler_service_1.LessonHandlerService])
], LessonGuestPageResolver);
exports.LessonGuestPageResolver = LessonGuestPageResolver;
//# sourceMappingURL=lessonpageinfo.resolver.js.map