import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('azubi_userInventory')
@ObjectType()
export class UserInventoryEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "integer" })
    item_quantity: number

    @Field(() => GraphQLString, { nullable: true })
    item_name: string

    @Field()
    @Column({ type: "text" })
    item_code: string

    @Field()
    @Column({ type: "integer" })
    user_ID: number

    @Field(() => GraphQLString, { nullable: true })
    item_avatar: string

    @Field(() => GraphQLString, { nullable: true })
    item_description: string

}

export interface UserInventoryInput {
    item_quantity: number
    item_code: string
    user_ID: number
}