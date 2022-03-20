export declare class MediaListEntity {
    ID: number;
    media_name: string;
    media_type: string;
    media_path: string;
    user_ID: number;
    parent_ID: number;
    media_created_time: Date;
    media_category: string;
    media_status: "trash" | "draft" | "publish";
}
export declare class GetmediaInput {
    media_id: number | undefined;
    media_name: string | undefined;
    parent_id: number | undefined;
    media_status: "published" | "trash";
}
export declare class FormUploadMediaInput {
    media_name: string;
    media_type: string;
    media_path: string;
    user_ID: number;
    parent_ID: number;
    media_category: string;
    media_status: "trash" | "draft" | "publish";
}
export declare class UpdateFormUploadMediaInput {
    parent_ID: number;
    media_status: "trash" | "draft" | "publish";
}
