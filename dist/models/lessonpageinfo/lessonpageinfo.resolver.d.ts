import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { Repository } from "typeorm";
import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { PostEntity } from "../post/post.entity";
import { LessonGuestPageEntity } from "./lessonpageinfo.entity";
export declare class LessonGuestPageResolver {
    private readonly lessonpagerepository;
    private _fetchdataService;
    private lessonhandlerService;
    constructor(lessonpagerepository: Repository<LessonGuestPageEntity>, _fetchdataService: FetchDataService, lessonhandlerService: LessonHandlerService);
    lesson_page(): Promise<LessonGuestPageEntity[]>;
    lesson_tree(): Promise<AreaListEntity[]>;
    all_lessons(): Promise<PostEntity[]>;
    defaultconfig(): DefaultConfigEntity;
}
