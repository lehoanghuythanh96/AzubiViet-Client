import { ObjectType, Field, Int } from "@nestjs/graphql";
import { GraphQLBoolean } from "graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MediaListEntity } from "../media/media.entity";

@Entity('questionmarket_user_answers')
@ObjectType()
export class QuestionMarket_UserAnswerEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "text" })
    answer_content: string;

    @Field()
    @Column({ type: "integer" })
    parent_ID: number;

    @Field()
    @Column({ type: "integer" })
    user_ID: number;

    @Field()
    @Column({ type: "boolean", default: false })
    is_reviewed: boolean;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    answer_date: Date;

    @Field(() => GraphQLBoolean, {defaultValue: false})
    answer_is_outdated: boolean;

    @Field()
    @Column({ type: "integer", default: 0 })
    review_ID: number;

    @Field(() => [Int])
    @Column({ type: "json", default: [] })
    waiting_reviewers: number[];

    @Field(() => [MediaListEntity], {nullable: true})
    answer_imgs: MediaListEntity[];

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
    @Column({ type: "text", default: "publish" })
    answer_status: "publish" | "trash";

    @Field()
    @Column({ type: "boolean", default: false })
    author_isBlocked: boolean;
    
}

export interface QuestionMarket_UserAnswerInput {
    answer_content: string
    parent_ID: number
    user_ID: number
}