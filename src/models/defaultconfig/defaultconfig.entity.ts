import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class DefaultConfigEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID?: number;

    @Field()
    postimg_path: string

    @Field()
    default_post_avatar: string

    @Field()
    userimg_path: string

    @Field()
    shopitem_img_path: string

    @Field()
    QA_img_path: string
    
}