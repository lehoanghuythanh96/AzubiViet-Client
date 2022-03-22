"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonHandlerModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const arealist_resolver_1 = require("../../models/arealist/arealist.resolver");
const lessoncategory_resolver_1 = require("../../models/lessoncategory/lessoncategory.resolver");
const lessonpageinfo_resolver_1 = require("../../models/lessonpageinfo/lessonpageinfo.resolver");
const fetch_data_module_1 = require("../fetch-data/fetch-data.module");
const lesson_handler_controller_1 = require("./lesson-handler.controller");
let LessonHandlerModule = class LessonHandlerModule {
};
LessonHandlerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.registerAsync({
                useFactory: () => ({
                    ttl: 86400,
                    max: 100
                })
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('SECRET_TOKEN'),
                    signOptions: { expiresIn: '5 days' }
                }),
                inject: [config_1.ConfigService],
            }),
            fetch_data_module_1.FetchDataModule
        ],
        controllers: [
            lesson_handler_controller_1.LessonHandlerController,
            lesson_handler_controller_1.UploadLessonImageController,
            lesson_handler_controller_1.PublishNewLessonController,
            lesson_handler_controller_1.EditSingleLessonController,
            lesson_handler_controller_1.UploadLessonAvatarByUrlController,
            lesson_handler_controller_1.UploadLessonAvatarByimgFileController,
            lesson_handler_controller_1.DeletesinglelessonController,
            lesson_handler_controller_1.AddLessonCategoryController
        ],
        providers: [
            arealist_resolver_1.AreaListResolver,
            lessoncategory_resolver_1.LessonCategoryResolver,
            lessonpageinfo_resolver_1.LessonGuestPageResolver,
        ]
    })
], LessonHandlerModule);
exports.LessonHandlerModule = LessonHandlerModule;
//# sourceMappingURL=lesson-handler.module.js.map