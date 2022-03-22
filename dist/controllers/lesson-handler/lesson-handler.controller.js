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
exports.DeletesinglelessonController = exports.UploadLessonAvatarByUrlController = exports.UploadLessonAvatarByimgFileController = exports.EditSingleLessonController = exports.PublishNewLessonController = exports.UploadLessonImageController = exports.AddLessonCategoryController = exports.LessonHandlerController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const post_entity_1 = require("../../models/post/post.entity");
const jwt_auth_guard_1 = require("../../tools/auth-tools/jwt-auth.guard");
const lesson_handler_service_1 = require("./lesson-handler.service");
const Joi = require("joi");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
let config = nestconfig_interface_1.SystemDefaultConfig;
let LessonHandlerController = class LessonHandlerController {
};
LessonHandlerController = __decorate([
    (0, common_1.Controller)('lesson-handler')
], LessonHandlerController);
exports.LessonHandlerController = LessonHandlerController;
let AddLessonCategoryController = class AddLessonCategoryController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
        this.uploadschema = Joi.object({
            category_name: Joi.string().required(),
            area_ID: Joi.number().min(1).required()
        });
    }
    async addlessoncategory(req, body) {
        var _a;
        if (req.user.user_role == 'admin') {
            if (this.uploadschema.validate(body).error) {
                throw new common_1.ForbiddenException({ message: (_a = this.uploadschema.validate(body).error) === null || _a === void 0 ? void 0 : _a.message });
            }
            let _result = await this.fetchDataService.lessoncategoryRepository.save({
                category_name: body.category_name,
                area_ID: body.area_ID
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.lessoncategory_all);
            return _result;
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AddLessonCategoryController.prototype, "addlessoncategory", null);
AddLessonCategoryController = __decorate([
    (0, common_1.Controller)('addlessoncategory'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], AddLessonCategoryController);
exports.AddLessonCategoryController = AddLessonCategoryController;
let UploadLessonImageController = class UploadLessonImageController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    uploadlessonimage(req, query) {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.fetchDataService.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.LESSON_IMG_CAT,
                    media_status: 'trash'
                };
                await this.fetchDataService.mediarepository.save(mediapayload);
                await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
                return result;
            }).catch((error) => {
                throw error;
            }));
        }
        else {
            throw new common_1.PayloadTooLargeException({ message: 'File is too large' });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UploadLessonImageController.prototype, "uploadlessonimage", null);
UploadLessonImageController = __decorate([
    (0, common_1.Controller)('uploadlessonimage'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UploadLessonImageController);
exports.UploadLessonImageController = UploadLessonImageController;
let PublishNewLessonController = class PublishNewLessonController {
    constructor(_lessonservice) {
        this._lessonservice = _lessonservice;
        this.uploadschema = Joi.object({
            post_title: Joi.string().max(255).required(),
            post_content: Joi.string().required(),
            post_category: Joi.array().required(),
            post_imgarr: Joi.array().required(),
            post_avatar: Joi.string().required()
        });
    }
    publishnewlesson(req, body) {
        var _a;
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: (_a = _checker.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let _lesson = {
            post_title: body.post_title,
            post_content: body.post_content,
            post_author: req.user.user_id,
            post_type: post_entity_1.postTypes.lesson,
            post_category: body.post_category,
            post_status: 'publish'
        };
        if (req.user.user_role === 'admin') {
            return (0, rxjs_1.from)(this._lessonservice.publishlesson(_lesson, body.post_imgarr, body.post_avatar, req.user));
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], PublishNewLessonController.prototype, "publishnewlesson", null);
PublishNewLessonController = __decorate([
    (0, common_1.Controller)('publishnewlesson'),
    __metadata("design:paramtypes", [lesson_handler_service_1.LessonHandlerService])
], PublishNewLessonController);
exports.PublishNewLessonController = PublishNewLessonController;
let EditSingleLessonController = class EditSingleLessonController {
    constructor(_lessonservice) {
        this._lessonservice = _lessonservice;
        this.uploadschema = Joi.object({
            ID: Joi.number().required(),
            post_title: Joi.string().max(255).required(),
            post_content: Joi.string().required(),
            post_category: Joi.array().required(),
            post_imgarr: Joi.array().required(),
            post_avatar: Joi.string().required()
        });
    }
    editsinglelesson(req, body) {
        var _a;
        let _checker = this.uploadschema.validate(body);
        if (_checker.error) {
            throw new common_1.ForbiddenException({ message: (_a = _checker.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let _lesson = {
            post_title: body.post_title,
            post_content: body.post_content,
            post_author: req.user.user_id,
            post_type: post_entity_1.postTypes.lesson,
            post_category: body.post_category,
            post_status: 'publish'
        };
        if (req.user.user_role === 'admin') {
            return (0, rxjs_1.from)(this._lessonservice.editlesson(body.ID, _lesson, body.post_imgarr, body.post_avatar, req.user));
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], EditSingleLessonController.prototype, "editsinglelesson", null);
EditSingleLessonController = __decorate([
    (0, common_1.Controller)('editsinglelesson'),
    __metadata("design:paramtypes", [lesson_handler_service_1.LessonHandlerService])
], EditSingleLessonController);
exports.EditSingleLessonController = EditSingleLessonController;
let UploadLessonAvatarByimgFileController = class UploadLessonAvatarByimgFileController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    uploadlessonavatarbyimgfile(req, query) {
        let path_to_save = config.POST_IMG_PATH;
        if (query.file_size && query.file_size < 25000000) {
            return (0, rxjs_1.from)(this.fetchDataService.basictools.formuploadIMG(req, query.file_obj_name, path_to_save, req.user).then(async (result) => {
                let mediapayload = {
                    media_name: result.newFilename,
                    media_type: result.format,
                    media_path: result.newFilepath,
                    user_ID: req.user.user_id,
                    parent_ID: 0,
                    media_category: config.LESSON_AVT_CAT,
                    media_status: 'trash'
                };
                await this.fetchDataService.mediarepository.save(mediapayload);
                await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
                return result;
            }).catch((error) => {
                throw error;
            }));
        }
        else {
            throw new common_1.PayloadTooLargeException({ message: 'File is too large' });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UploadLessonAvatarByimgFileController.prototype, "uploadlessonavatarbyimgfile", null);
UploadLessonAvatarByimgFileController = __decorate([
    (0, common_1.Controller)('uploadlessonavatarbyimgfile'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UploadLessonAvatarByimgFileController);
exports.UploadLessonAvatarByimgFileController = UploadLessonAvatarByimgFileController;
let UploadLessonAvatarByUrlController = class UploadLessonAvatarByUrlController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    uploadlessonavatarbyurl(req, body) {
        return (0, rxjs_1.from)(this.fetchDataService.basictools.uploadimgbyurl(body.img_url, config.POST_IMG_PATH, req.user).then(async (result) => {
            let mediapayload = {
                media_name: result.newFilename,
                media_type: result.format,
                media_path: result.newFilepath,
                user_ID: req.user.user_id,
                parent_ID: 0,
                media_category: config.LESSON_AVT_CAT,
                media_status: 'trash'
            };
            await this.fetchDataService.mediarepository.save(mediapayload);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
            return result;
        }).catch((error) => {
            throw error;
        }));
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UploadLessonAvatarByUrlController.prototype, "uploadlessonavatarbyurl", null);
UploadLessonAvatarByUrlController = __decorate([
    (0, common_1.Controller)('uploadlessonavatarbyurl'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], UploadLessonAvatarByUrlController);
exports.UploadLessonAvatarByUrlController = UploadLessonAvatarByUrlController;
let DeletesinglelessonController = class DeletesinglelessonController {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async deletesinglelesson(req, body) {
        await this.fetchDataService.mediarepository.update({
            parent_ID: body.post_ID
        }, {
            media_status: "trash"
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
        let _result = await this.fetchDataService.postrepository.delete({
            ID: body.post_ID
        });
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.public_lessons);
        return _result;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DeletesinglelessonController.prototype, "deletesinglelesson", null);
DeletesinglelessonController = __decorate([
    (0, common_1.Controller)('deletesinglelesson'),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], DeletesinglelessonController);
exports.DeletesinglelessonController = DeletesinglelessonController;
//# sourceMappingURL=lesson-handler.controller.js.map