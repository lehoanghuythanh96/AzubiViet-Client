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
exports.LessonHandlerService = void 0;
const common_1 = require("@nestjs/common");
const cacheKeys_entity_1 = require("../../models/cacheKeys/cacheKeys.entity");
const nestconfig_interface_1 = require("../../models/config/nestconfig.interface");
const post_entity_1 = require("../../models/post/post.entity");
const typeorm_1 = require("typeorm");
const fetch_data_service_1 = require("../fetch-data/fetch-data.service");
let config = nestconfig_interface_1.SystemDefaultConfig;
let LessonHandlerService = class LessonHandlerService {
    constructor(fetchDataService) {
        this.fetchDataService = fetchDataService;
    }
    async getallpubliclesson() {
        let _cache = await this.fetchDataService.cacheManager.store.get(cacheKeys_entity_1._cacheKey.public_lessons);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.fetchDataService.postrepository.find({
            post_type: post_entity_1.postTypes.lesson,
            post_status: "publish"
        });
        await this.fetchDataService.cacheManager.store.set(cacheKeys_entity_1._cacheKey.public_lessons, _data);
        return [..._data];
    }
    async getall_lessoncategory() {
        let _cache = await this.fetchDataService.cacheManager.store.get(cacheKeys_entity_1._cacheKey.lessoncategory_all);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.fetchDataService.lessoncategoryRepository.find();
        await this.fetchDataService.cacheManager.store.set(cacheKeys_entity_1._cacheKey.lessoncategory_all, _data);
        return [..._data];
    }
    async getalllessonavatar() {
        let _cache = await this.fetchDataService.cacheManager.store.get(cacheKeys_entity_1._cacheKey.all_lessonavatar);
        if (_cache) {
            return [..._cache];
        }
        let _data = await this.fetchDataService.mediarepository.find({
            media_category: config.LESSON_AVT_CAT
        });
        await this.fetchDataService.cacheManager.store.set(cacheKeys_entity_1._cacheKey.all_lessonavatar, _data);
        return [..._data];
    }
    async publishlesson(newlesson, imgarr, lesson_avatar, user) {
        let _add = await this.fetchDataService.postrepository.save(newlesson);
        if (_add.ID) {
            await this.fetchDataService.mediarepository.update({ media_name: lesson_avatar }, {
                parent_ID: _add.ID,
                media_status: "publish"
            });
            for (let i = 0; i < imgarr.length; i++) {
                if (imgarr[i].isOrigin == true) {
                    let extension = imgarr[i].name.split('.').pop();
                    let _tempimg = await this.fetchDataService.mediarepository.findOne({
                        media_name: imgarr[i].name
                    });
                    newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, _tempimg.media_path);
                    await this.fetchDataService.mediarepository.update({ media_name: imgarr[i].name }, {
                        media_type: extension,
                        parent_ID: _add.ID,
                        media_status: "publish"
                    });
                }
                else {
                    await this.fetchDataService.basictools.uploadimgbyurl(imgarr[i].link, config.POST_IMG_PATH, user).then(async (result) => {
                        let mediapayload = {
                            media_name: result.newFilename,
                            media_type: result.format,
                            media_path: result.newFilepath,
                            user_ID: user.user_id,
                            parent_ID: _add.ID,
                            media_category: config.LESSON_IMG_CAT,
                            media_status: 'publish'
                        };
                        await this.fetchDataService.mediarepository.save(mediapayload);
                        newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, mediapayload.media_path);
                        return result;
                    }).catch((error) => {
                        throw error;
                    });
                }
            }
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_lessonavatar);
            let _result = await this.fetchDataService.postrepository.update({
                ID: _add.ID
            }, {
                post_content: newlesson.post_content
            });
            await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.public_lessons);
            return _result;
        }
        else {
            return null;
        }
    }
    async editlesson(ID, newlesson, imgarr, lesson_avatar, user) {
        await this.fetchDataService.mediarepository.update({
            parent_ID: ID,
            media_category: (0, typeorm_1.In)([config.LESSON_IMG_CAT, config.LESSON_AVT_CAT])
        }, {
            media_status: "trash"
        });
        await this.fetchDataService.mediarepository.update({
            media_name: lesson_avatar
        }, {
            parent_ID: ID,
            media_status: "publish"
        });
        for (let i = 0; i < imgarr.length; i++) {
            if (imgarr[i].isOrigin == true) {
                let extension = imgarr[i].name.split('.').pop();
                let _tempimg = await this.fetchDataService.mediarepository.findOne({
                    media_name: imgarr[i].name
                });
                newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, _tempimg.media_path);
                await this.fetchDataService.mediarepository.update({ media_name: imgarr[i].name }, {
                    media_type: extension,
                    parent_ID: ID,
                    media_status: "publish"
                });
            }
            else {
                await this.fetchDataService.basictools.uploadimgbyurl(imgarr[i].link, config.POST_IMG_PATH, user).then(async (result) => {
                    let mediapayload = {
                        media_name: result.newFilename,
                        media_type: result.format,
                        media_path: result.newFilepath,
                        user_ID: user.user_id,
                        parent_ID: ID,
                        media_category: config.LESSON_IMG_CAT,
                        media_status: 'publish'
                    };
                    await this.fetchDataService.mediarepository.save(mediapayload);
                    newlesson.post_content = newlesson.post_content.replace(imgarr[i].link, mediapayload.media_path);
                    return result;
                }).catch((error) => {
                    throw error;
                });
            }
        }
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_lessonavatar);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.all_trash_medias);
        let _update = await this.fetchDataService.postrepository.update({
            ID: ID
        }, newlesson);
        await this.fetchDataService.cacheManager.store.del(cacheKeys_entity_1._cacheKey.public_lessons);
        return _update;
    }
};
LessonHandlerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], LessonHandlerService);
exports.LessonHandlerService = LessonHandlerService;
//# sourceMappingURL=lesson-handler.service.js.map