import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MediaListEntity } from "../media/media.entity";
import { QuestionMarketAnswerEntity } from "../questionmarketanswer/questionmarketanswer.entity";
import { QuestionMarket_UserAnswerEntity } from "../QuestionMarket_UserAnswer/questionmarket_useranswer.entity";
import { UserEntity } from "../userauthentication/userauth.entity";

@Entity('azb_posts')
@ObjectType()
export class PostEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ length: 255 })
    post_title: string;

    @Field()
    @Column({ type: "text" })
    post_content: string;

    @Field()
    @Column({ type: "integer" })
    post_author: number;

    @Field()
    @Column({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP' })
    post_date: Date;

    @Field()
    @Column({ length: 55 })
    post_type: postTypes;

    @Field(Type => [Int])
    @Column({ type: "integer", default: [], array: true })
    post_category: number[];

    @Field()
    @Column({ type: "integer", default: 3 })
    question_experience: number;

    @Field()
    @Column({ length: 55, default: "draft" })
    post_status: "trash" | "draft" | "publish";

    @Field(() => MediaListEntity, {nullable: true})
    post_avatar: MediaListEntity;

    @Field(() => QuestionMarketAnswerEntity, {nullable: true})
    question_answer: QuestionMarketAnswerEntity;

    @Field(() => [MediaListEntity], {nullable: true})
    question_imgs: MediaListEntity[];

    @Field(() => MediaListEntity, {nullable: true})
    question_avatar: MediaListEntity;

    @Field(() => MediaListEntity, {nullable: true})
    lesson_avatar: MediaListEntity;

    @Field(() => UserEntity, {nullable: true})
    author_info: UserEntity;

    @Field(() => [QuestionMarket_UserAnswerEntity], { nullable: true })
    questionmarket_user_answer: QuestionMarket_UserAnswerEntity[]

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
    author_isBlocked: boolean;

}

export enum postTypes {
    post = "post",
    lesson = "lesson",
    question_product = "question_product"
}