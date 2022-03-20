import { QuestionMarketService } from "src/controllers/question-market/question-market.service";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";
import { userJWTpayload } from "../userJWTpayload/userJWTpayload.interface";
export declare class QuestionMarketAnswerResolver {
    private questionmarketService;
    constructor(questionmarketService: QuestionMarketService);
    answer_imgs(user: userJWTpayload, QuestionMarketAnswerEntity: QuestionMarketAnswerEntity): Promise<MediaListEntity[]>;
}
