import { UseGuards } from "@nestjs/common";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { GqlJwtAuthGuard } from "src/tools/auth-tools/jwt-auth.guard";
import { JwtCurrentUser } from "src/tools/auth-tools/user.decorator";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";

@Resolver(() => QuestionMarketAnswerEntity)
export class QuestionMarketAnswerResolver {

    constructor(
        private questionmarketService: QuestionMarketService
    ) { }

    @ResolveField(() => [MediaListEntity])
    @UseGuards(GqlJwtAuthGuard)
    async answer_imgs(@JwtCurrentUser() user: userJWTpayload, @Parent() QuestionMarketAnswerEntity: QuestionMarketAnswerEntity) {
        
        let _cache = await this.questionmarketService.getallquestionanswerIMG();

        let _data = [..._cache.filter(
            y => y.parent_ID == QuestionMarketAnswerEntity.ID
        )]

        return _data
    }

}