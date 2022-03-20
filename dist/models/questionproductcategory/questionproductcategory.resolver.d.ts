import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { Repository } from "typeorm";
import { PostEntity } from "../post/post.entity";
import { QuestionProductCategoryEntity } from "./questionproductcategory.entity";
export declare class QuestionProductCategoryResolver {
    private readonly postrepository;
    private readonly _questionmarketService;
    constructor(postrepository: Repository<PostEntity>, _questionmarketService: QuestionMarketService);
    child_lessons(QuestionProductCategoryEntity: QuestionProductCategoryEntity): Promise<PostEntity[]>;
}
