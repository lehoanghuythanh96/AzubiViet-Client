import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('azubiviet_media')
@ObjectType()
export class MediaListEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "integer" })
    ID: number;

    @Field()
    @Column({ length: 125 })
    media_name: string;

    @Field()
    @Column({ length: 15 })
    media_type: string;

    @Field()
    @Column({ type: "text" })
    media_path: string;

    @Field()
    @Column({ type: "integer" })
    user_ID: number;

    @Field()
    @Column({ default: 0, type: "integer" })
    parent_ID: number;

    @Field()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    media_created_time: Date;

    @Field()
    @Column({ length: 255 })
    media_category: string;

    @Field()
    @Column({ default: "trash", length: 32 })
    media_status: "trash" | "draft" | "publish";
}

@InputType()
export class GetmediaInput {
    media_id: number | undefined;
    media_name: string | undefined;
    parent_id: number | undefined;
    media_status: "published" | "trash";
}

@InputType()
export class FormUploadMediaInput {
    media_name: string;
    media_type: string;
    media_path: string;
    user_ID: number;
    parent_ID: number;
    media_category: string;
    media_status: "trash" | "draft" | "publish"
}

@InputType()
export class UpdateFormUploadMediaInput {
    parent_ID: number
    media_status: "trash" | "draft" | "publish"
}