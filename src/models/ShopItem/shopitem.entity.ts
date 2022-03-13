import { ObjectType, Field } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('aZubi_ShopItems')
@ObjectType()
export class ShopItemEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "text" })
    item_code: string;

    @Field()
    @Column({ type: "text" })
    item_name: string

    @Field()
    @Column({ type: "text" })
    item_description: string

    @Field()
    @Column({ type: "integer" })
    item_price: number;

    @Field(() => GraphQLString, { defaultValue: "assets/images/shop_item/" })
    avatar_path: string;

    @Field()
    @Column({ type: "text" })
    item_avatar: string;
}

export enum ShopItemCodes {
    reverseClock = "DELR",
    revivalRoll = "RIVR",
    reportFighter = "RPFT"
}