import { Field, ObjectType } from "@nestjs/graphql";
import { Entity } from "typeorm";
import { UserEntity } from "../userauthentication/userauth.entity";

@Entity()
@ObjectType()
export class AdminInfoEntity extends UserEntity {
}