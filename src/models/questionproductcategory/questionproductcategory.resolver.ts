import { Inject, CACHE_MANAGER } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { FetchDataService } from "src/controllers/fetch-data/fetch-data.service";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { Repository } from "typeorm";
import { AppCache, _cacheKey } from "../cacheKeys/cacheKeys.entity";
import { PostEntity } from "../post/post.entity";
import { QuestionProductCategoryEntity } from "./questionproductcategory.entity";

@Resolver(() => QuestionProductCategoryEntity)
export class QuestionProductCategoryResolver {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postrepository: Repository<PostEntity>,
        private readonly _questionmarketService: QuestionMarketService
    ) { }

    @ResolveField(() => [PostEntity])
    async child_lessons(@Parent() QuestionProductCategoryEntity: QuestionProductCategoryEntity) {
        
        let _cache = await this._questionmarketService.getall_questionproduct();

        let _data = [..._cache.filter(
            y => y.post_category.indexOf(QuestionProductCategoryEntity.ID) >= 0 && y.author_isBlocked == false
        )]

        return _data;
        
    }

}