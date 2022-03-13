import { ObjectType, Field, Int } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PostEntity } from "../post/post.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";

@Entity('user_answer_reviews')
@ObjectType()
export class UserAnswerReviewEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "boolean" })
    correctness: boolean;

    @Field()
    @Column({ type: "text" })
    review_content: string;

    @Field()
    @Column({ type: "integer" })
    answerer_ID: number;

    @Field()
    @Column({ type: "integer" })
    user_answer_ID: number;

    @Field()
    @Column({ type: "integer" })
    question_ID: number;

    @Field(() => GraphQLJSONObject)
    @Column({ type: "json" })
    question_info: PostEntity;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    review_date: Date;

    @Field()
    @Column({ type: "integer" })
    review_author: number;

    @Field()
    @Column({ type: "boolean", default: false})
    review_confirmation: boolean;

    @Field(() => Int)
    @Column({ type: "integer"})
    original_answer_ID: number;

    @Field(() => GraphQLJSONObject)
    @Column({ type: "json", default: {}})
    original_answer_info: any;

    @Field()
    @Column({ type: "boolean", default: true })
    review_updated: boolean;

    @Field()
    @Column({ type: "boolean", default: false })
    review_fixed: boolean;

    @Field()
    @Column({ type: "boolean", default: false })
    is_reported: boolean;

    @Field()
    @Column({ type: "text", default: "" })
    report_notes: string;

    @Field()
    @Column({ type: "integer", default: 0 })
    report_sender: number;

    @Field()
    @Column({ type: "integer", default: 0 })
    report_counter: number;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    reported_date: Date;

    @Field(() => [Int])
    @Column({ type: "json", default: [] })
    report_controllers: number[];

    @Field()
    @Column({ type: "boolean", default: false })
    review_confirmed: boolean;

    @Field()
    @Column({ type: "boolean", default: false })
    review_isLiked: boolean;

    @Field()
    @Column({ type: "text", default: "publish" })
    review_status: "publish" | "trash";

    @Field()
    @Column({ type: "boolean", default: false })
    author_isBlocked: boolean;

}

export interface UserAnswerReviewInput {
    correctness: boolean
    review_content: string
    answerer_ID: number
    question_ID: number
    question_info: any
    original_answer_ID: number
    original_answer_info: any
    user_answer_ID: number
    review_author: number
}