import { MediaEntity } from "../mediaentity/media.entity";
import { QuestionMarketAnswerEntity } from "../QuestionMarketAnswerEntity/QuestionMarketAnswer.entity";
import { QuestionMarket_UserAnswerEntity } from "../questionmarketuseranswer/questionmarketuseranswer.entity";
import { UserEntity } from "../userentity/userinfo.entity";

export interface PostEntity {
    ID: number
    post_title: string
    post_content: string
    post_author: number
    post_date: Date
    post_type: string
    post_category: number[]
    post_status: string
    lesson_avatar: MediaEntity
    question_avatar: MediaEntity
    question_answer: QuestionMarketAnswerEntity
    question_imgs: MediaEntity[],
    author_info: UserEntity,
    questionmarket_user_answer: QuestionMarket_UserAnswerEntity[] | null,
    is_reported: boolean
    report_notes: string
    report_sender: number
    report_counter: number
    reported_date: Date
    report_controllers: number[]
}

export interface AddNewQuestionProducPostBody {
    post_category: Array<number>
    post_title: string
    post_content: string
    answer_content: string
    question_avatar: string
    questionimgs: Array<string>
    answerimgs: Array<string>
}

export interface EditQuestionProducPostBody extends AddNewQuestionProducPostBody {
    question_ID: number,
    answer_ID: number
}