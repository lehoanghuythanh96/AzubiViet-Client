import { Resolver } from "@nestjs/graphql";
import { UserAnswerReviewEntity } from "./useranswer_review.entity";

@Resolver(() => UserAnswerReviewEntity)
export class UserAnswerReviewResolver {

    constructor(
    ) { }

}