import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LessonCategoryEntity } from "../lessoncategory/lessoncategory.entity";

@Entity('azubi_arealist')
@ObjectType()
export class AreaListEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ length: 255 })
    area_name: string;
    
}