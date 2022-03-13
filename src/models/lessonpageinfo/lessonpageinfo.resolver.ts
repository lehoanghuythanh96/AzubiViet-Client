import { ResolveField, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { Repository } from "typeorm";
import { AreaListEntity } from "../arealist/arealist.entity";
import { SystemDefaultConfig } from "../config/nestconfig.interface";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { PostEntity } from "../post/post.entity";
import { LessonGuestPageEntity } from "./lessonpageinfo.entity";

let config = SystemDefaultConfig;

@Resolver(() => LessonGuestPageEntity)
export class LessonGuestPageResolver { 

    constructor(
        @InjectRepository(LessonGuestPageEntity)
        private readonly lessonpagerepository: Repository<LessonGuestPageEntity>,
        private _fetchdataService: FetchDataService,
        private lessonhandlerService: LessonHandlerService
    ) { }

    @Query(() => LessonGuestPageEntity)
    async lesson_page() {
        return await this.lessonpagerepository.find();
    }

    @ResolveField(() => [AreaListEntity])
    async lesson_tree() {
        return await this._fetchdataService.getallarea();
    }

    @ResolveField(() => [PostEntity])
    async all_lessons() {
        return await this.lessonhandlerService.getallpubliclesson();
    }

    @ResolveField(() => DefaultConfigEntity)
    defaultconfig() {
        let _config : DefaultConfigEntity = {
            postimg_path: config.POST_IMG_PATH,
            default_post_avatar: config.DEFAULT_POST_AVATAR,
            userimg_path: config.USER_IMG_PATH,
            shopitem_img_path: config.SHOPITEM_IMG_PATH,
            QA_img_path: config.QA_IMG_PATH
        }
        return _config
    }

}