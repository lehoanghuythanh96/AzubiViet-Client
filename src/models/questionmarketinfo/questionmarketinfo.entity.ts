import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { AreaListEntity } from "../arealist/arealist.entity";
import { DefaultConfigEntity } from "../defaultconfig/defaultconfig.entity";
import { ShopItemEntity } from "../ShopItem/shopitem.entity";
import { UserAnswerReviewEntity } from "../useranswer_review/useranswer_review.entity";

@Entity()
@ObjectType()
export class QuestionMarketInfoEntity {
    
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field(() => [AreaListEntity])
    product_tree: [AreaListEntity]

    @Field()
    defaultconfig: DefaultConfigEntity

    @Field(() => [UserAnswerReviewEntity], { nullable: true })
    answer_reviews: UserAnswerReviewEntity[]

    @Field(() => [ShopItemEntity], { nullable: true })
    shop_items: ShopItemEntity[]

}