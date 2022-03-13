import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "../post/post.entity";

@Entity('lesson_categories')
@ObjectType()
export class LessonCategoryEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ length: 255 })
    category_name: string;

    @Field()
    @Column({ type: "integer" })
    area_ID: number;

    @Field(() => [PostEntity])
    child_lessons: [PostEntity]
}

export interface AddCategoryInput {
    category_name: string,
    area_ID: number
}