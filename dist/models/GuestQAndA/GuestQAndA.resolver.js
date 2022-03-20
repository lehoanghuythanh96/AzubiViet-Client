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
exports.GuestQAndAResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const fetch_data_service_1 = require("../../controllers/fetch-data/fetch-data.service");
const media_entity_1 = require("../media/media.entity");
const postlike_entity_1 = require("../postLikes/postlike.entity");
const GuestQAndA_entity_1 = require("./GuestQAndA.entity");
let GuestQAndAResolver = class GuestQAndAResolver {
    constructor(_fetchdataService) {
        this._fetchdataService = _fetchdataService;
    }
    async guest_QAs() {
        let _allQAs = await this._fetchdataService.getAllguestQandA_items();
        return _allQAs;
    }
    async like_arr(QAItem) {
        let allLikes = await this._fetchdataService.getAllpostLikes();
        let foundLike = allLikes.find(y => y.parent_ID == QAItem.ID && y.type == postlike_entity_1.PostLikeTypes.QA_Answer);
        if (foundLike) {
            return foundLike.user_array;
        }
        else {
            return [];
        }
    }
    async QA_imgs(GuestQA) {
        if (GuestQA.item_type == "question") {
            let _cache = await this._fetchdataService.getall_qanda_IMG();
            let _data = [..._cache.filter(y => y.parent_ID == GuestQA.ID)];
            return _data;
        }
        else {
            return null;
        }
    }
};
__decorate([
    (0, graphql_1.Query)(() => [GuestQAndA_entity_1.GuestQAndAEntity]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GuestQAndAResolver.prototype, "guest_QAs", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GuestQAndA_entity_1.GuestQAndAEntity]),
    __metadata("design:returntype", Promise)
], GuestQAndAResolver.prototype, "like_arr", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [media_entity_1.MediaListEntity]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GuestQAndA_entity_1.GuestQAndAEntity]),
    __metadata("design:returntype", Promise)
], GuestQAndAResolver.prototype, "QA_imgs", null);
GuestQAndAResolver = __decorate([
    (0, graphql_1.Resolver)(() => GuestQAndA_entity_1.GuestQAndAEntity),
    __metadata("design:paramtypes", [fetch_data_service_1.FetchDataService])
], GuestQAndAResolver);
exports.GuestQAndAResolver = GuestQAndAResolver;
//# sourceMappingURL=GuestQAndA.resolver.js.map