import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionMarketAPIService {

  constructor(
    private apollo: Apollo
  ) { }

  getquestionmarketinfoapi: Observable<any> = this.apollo.watchQuery({
    query: gql`
    { 
      questionmarketinfo {
        product_tree {
          ID,
          area_name,
          child_category_questionproduct {
              ID,
              category_name,
              child_lessons {
                ID,
                post_title,
                post_content,
                post_author,
                post_status,
                post_category,
                post_date,
                is_reported,
                report_notes,
                report_sender,
                report_counter,
                reported_date,
                report_controllers,
                question_answer {
                  ID,
                  answer_content,
                  answer_imgs {
                    media_name
                  }
                },
                question_imgs {
                  media_name
                },
                question_avatar {
                  media_name
                },
                author_info {
                  user_name,
                  user_role,
                  user_level,
                  user_avatar {
                    media_name,
                    media_path
                  },
                  gender
                },
                questionmarket_user_answer {
                  ID,
                  answer_content,
                  parent_ID,
                  user_ID,
                  is_reviewed,
                  answer_date,
                  answer_is_outdated,
                  review_ID,
                  waiting_reviewers,
                  answer_imgs {
                    media_name,
                    media_path
                  },
                  is_reported,
                  report_notes,
                  report_sender,
                  reported_date,
                  report_controllers
                }
              }
          }
        },
        defaultconfig {
          postimg_path,
          default_post_avatar,
          userimg_path,
          shopitem_img_path
        },
        userinfo {
          user_name,
          user_role,
          user_level,
          user_abicoin,
          levelup_points,
          user_avatar {
            media_name,
            media_path
          },
          gender,
          user_private_answers {
            ID,
            answer_content,
            parent_ID,
            is_reviewed,
            answer_date,
            answer_is_outdated,
            review_ID,
            waiting_reviewers,
            answer_imgs {
              media_name,
              media_path
            },
            is_reported,
            report_notes,
            report_sender,
            reported_date,
            report_controllers
          }
        },
        shop_items {
          ID,
          item_code,
          item_name,
          item_description,
          item_price,
          item_avatar
        },
        answer_reviews {
          ID,
          correctness,
          review_content,
          answerer_ID,
          user_answer_ID,
          question_ID,
          question_info,
          review_date,
          review_author,
          review_confirmation,
          original_answer_ID,
          original_answer_info,
          review_updated,
          review_fixed,
          is_reported,
          report_notes,
          report_sender,
          report_counter,
          reported_date,
          report_controllers,
          review_confirmed,
          review_isLiked
        }
      }
    }
      `
  }).valueChanges;
}
