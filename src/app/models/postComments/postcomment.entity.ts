export interface PostCommentEntity {
    ID: number
    comment_content: string
    user_id: string
    comment_date: Date
    parent_ID: string
    post_type: string
    liked_users: number[]
    comment_status: string
}