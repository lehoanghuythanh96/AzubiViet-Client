import { MediaEntity } from "../mediaentity/media.entity";
import { PostEntity } from "../postentity/post.entity";
import { QuestionMarketAnswerEntity } from "../QuestionMarketAnswerEntity/QuestionMarketAnswer.entity";

export interface UserAnswerReviewEntity {
    ID: number
    correctness: boolean
    review_content: string
    answerer_ID: number
    user_answer_ID: number
    question_ID: number
    question_info: any
    review_date: Date
    review_author: number
    review_confirmation: boolean
    original_answer_ID: number
    original_answer_info: any
    review_updated: boolean
    review_fixed: boolean
    is_reported: boolean
    report_notes: string
    report_sender: number
    report_counter: number
    reported_date: Date
    report_controllers: number[]
    reported_confirmations: number
    review_confirmed: boolean
    review_isLiked: boolean
}