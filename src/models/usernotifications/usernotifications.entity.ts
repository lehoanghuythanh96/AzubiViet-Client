import { ObjectType, Field, Int } from "@nestjs/graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('user_notifications')
@ObjectType()
export class UserNotificationEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "text" })
    type: UserNotification_Types

    @Field(() => GraphQLJSONObject)
    @Column({ type: "json" })
    data: any;

    @Field()
    @Column({ type: "text" })
    secret: string;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    notification_date: Date;

    @Field(() => [Int])
    @Column({ type: "integer", array: true })
    user_IDs: number[];

    @Field(() => [Int])
    @Column({ type: "integer", array: true, default: [] })
    deletion_allowed: number[];

}

export interface UserNotificationInput {
    type: UserNotification_Types
    data: any
    secret: any
    user_IDs: number[];
    deletion_allowed: number[];
}

export enum UserNotification_Types {
    user_answer = "user_answer",
    review_isLiked = "review_isLiked",
    answer_isReviewed = "answer_isReviewed",
    answer_isReported = "answer_isReported",
    answerer_isPunished = "answerer_isPunished",
    user_answer_reporter_isPunished = "useranswer_reporter_isPunished",
    useranswer_review_isReported = "useranswer_review_isReported",
    useranswer_reviewer_isPunished = "useranswer_reviewer_isPunished",
    useranswer_review_Reporter_isPunished = "useranswer_review_Reporter_isPunished",
    questionProduct_isReported = "questionProduct_isReported",
    questionAuthor_isPunished = "questionAuthor_isPunished",
    questionProduct_Reporter_isPunished = "questionProduct_Reporter_isPunished",
    QA_QuestionItem_isReported = "QA_QuestionItem_isReported",
    QA_QuestionAuthor_isPunished = "QA_QuestionAuthor_isPunished",
    QA_QuestionItem_Reporter_isPunished = "QA_QuestionItem_Reporter_isPunished",
    QA_AnswerItem_isReported = "QA_AnswerItem_isReported",
    QA_AnswerAuthor_isPunished = "QA_AnswerAuthor_isPunished",
    QA_AnswerItem_Reporter_isPunished = "QA_AnswerItem_Reporter_isPunished",
}