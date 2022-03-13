import { ObjectType, Field } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('azubivie_leveltable')
@ObjectType()
export class LevelTableEntity {

    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ type: "integer" })
    level: number;

    @Field()
    @Column({ type: "integer" })
    experience: number;

}