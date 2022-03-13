import { LessonCategoryEntity } from "../lessoncategoryentity/lessoncategory.entity";
import { NestDefaultConfig } from "../nest_defaultconfig/nestdefaultconfig.entity";
import { PostEntity } from "../postentity/post.entity";

export interface LessonInfo {
    lesson_tree: [AreaListEntity] | null,
    defaultconfig: NestDefaultConfig | null,
    all_lessons: PostEntity[] | null
}

export interface AreaListEntity {
    ID: number,
    area_name: string,
    child_category_lesson: [LessonCategoryEntity]
    child_category_questionproduct: [LessonCategoryEntity]
}