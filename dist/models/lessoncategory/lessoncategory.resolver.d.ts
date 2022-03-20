import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { PostEntity } from "../post/post.entity";
export declare class LessonCategoryResolver {
    private _lessonService;
    constructor(_lessonService: LessonHandlerService);
    child_lessons(LessonCategoryEntity: LessonCategoryEntity): Promise<PostEntity[]>;
}
