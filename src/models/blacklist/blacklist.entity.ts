import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Azubi_BlackList')
@ObjectType()
export class BlackListEntity {

    @Field({ nullable: true })
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field({ nullable: true })
    @Column({ type: "text" })
    type: BlackListTypes;

    @Field({ nullable: true })
    @Column({ type: "integer" })
    user_ID: number;

    @Field(() => [Int], { nullable: true })
    @Column({ type: "integer", array: true})
    black_list: number[];

}

export interface BlackListInput {

    type: BlackListTypes
    user_ID: number
    black_list: number[]

}

export enum BlackListTypes {

    userPrivateMessage = "userPrivateMessage"

}