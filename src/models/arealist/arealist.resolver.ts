import { BadRequestException } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { AreaListEntity } from "../arealist/arealist.entity";
import { _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { QuestionProductCategoryEntity } from "../questionproductcategory/questionproductcategory.entity";

@Resolver(() => AreaListEntity)
export class AreaListResolver { 

    constructor(
        private _questionmarketService: QuestionMarketService,
        private _lessonhandlerService: LessonHandlerService
    ) { }

    @ResolveField(() => [LessonCategoryEntity])
    async child_category_lesson(@Parent() AreaListEntity: AreaListEntity) {

        let _cache = await this._lessonhandlerService.getall_lessoncategory();

        let _data = _cache.filter(y => y.area_ID == AreaListEntity.ID)

        if (_data) { 
            return _data
        } else {
            return new BadRequestException(
                {message: "Lesson categories by area ID not found"}
            )
        }
    }

    @ResolveField(() => [QuestionProductCategoryEntity])
    async child_category_questionproduct(@Parent() AreaListEntity: AreaListEntity) {

        let _cache = await this._questionmarketService.getall_questionproductcategory();

        let _data = _cache.filter(y => y.area_ID == AreaListEntity.ID)

        return _data
    }

}