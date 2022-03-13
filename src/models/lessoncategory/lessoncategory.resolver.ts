import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { PostEntity } from "../post/post.entity";

@Resolver(() => LessonCategoryEntity)
export class LessonCategoryResolver {

    constructor(
        private _lessonService: LessonHandlerService
    ) { }

    @ResolveField(() => [PostEntity])
    async child_lessons(@Parent() LessonCategoryEntity: LessonCategoryEntity) {

        let _cache = await this._lessonService.getallpubliclesson();

        let _data = _cache.filter(
            y => y.post_category.indexOf(LessonCategoryEntity.ID) >= 0
        )

        return _data;
    }

}