import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { PostEntity } from "../post/post.entity";

@Entity()
@ObjectType()
export class LessonGuestPageEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field(() => [AreaListEntity])
    lesson_tree: [AreaListEntity]

    @Field(() => [PostEntity])
    all_lessons: PostEntity[];

    @Field()
    defaultconfig: DefaultConfigEntity
    
}