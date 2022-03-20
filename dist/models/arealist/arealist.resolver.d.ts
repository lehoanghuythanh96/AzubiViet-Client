import { BadRequestException } from "@nestjs/common";
import { LessonHandlerService } from "src/controllers/lesson-handler/lesson-handler.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { AreaListEntity } from "../arealist/arealist.entity";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { QuestionProductCategoryEntity } from "../questionproductcategory/questionproductcategory.entity";
export declare class AreaListResolver {
    private _questionmarketService;
    private _lessonhandlerService;
    constructor(_questionmarketService: QuestionMarketService, _lessonhandlerService: LessonHandlerService);
    child_category_lesson(AreaListEntity: AreaListEntity): Promise<BadRequestException | LessonCategoryEntity[]>;
    child_category_questionproduct(AreaListEntity: AreaListEntity): Promise<QuestionProductCategoryEntity[]>;
}
