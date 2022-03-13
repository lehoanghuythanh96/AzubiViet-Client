import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { GuestQAndAEntity } from "../GuestQAndA/GuestQAndA.entity";
import { PostEntity } from "../post/post.entity";
import { PostCommentEntity } from "../postComment/postComment.entity";

@Entity()
@ObjectType()
export class MainLandingPageEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field(() => [PostCommentEntity])
    all_comments: PostCommentEntity[]

    @Field(() => [GuestQAndAEntity])
    all_QandA: GuestQAndAEntity[];

    @Field()
    defaultconfig: DefaultConfigEntity

    @Field(() => [PostEntity])
    all_lessons: PostEntity[];

    @Field(() => [PostEntity])
    all_questionproducts: PostEntity[];
    
}