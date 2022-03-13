import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";
import { PostEntity } from "../post/post.entity";

@Entity('question_product_categories')
@ObjectType()
export class QuestionProductCategoryEntity extends LessonCategoryEntity {

    @Field()
    @Column({ type: "integer" })
    user_ID: number;

}