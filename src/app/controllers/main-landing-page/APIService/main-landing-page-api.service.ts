import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainLandingPageAPIService {

  constructor(
    private apollo: Apollo
  ) { }

  mainlandingpageapi: Observable<any> = this.apollo.watchQuery({
    query: gql`
    { mainlandingpageInfo 
      {
        all_comments {
          ID,
          comment_content,
          user_id,
          comment_date,
          parent_ID,
          post_type,
          liked_users,
          comment_status
        },
        all_QandA {
          ID,
          item_content,
          user_email,
          user_ID,
          question_date,
          item_type,
          item_status,
          QA_status,
          parent_ID,
          like_arr,
          is_reported,
          report_notes,
          report_sender,
          reported_date,
          report_controllers,
          QA_imgs {
            media_name,
            media_path
          },
          QA_img_path
        },
        defaultconfig {
          postimg_path,
          default_post_avatar,
          userimg_path
        },
        all_lessons {
          ID,
          post_title,
          post_content,
          post_author,
          post_date,
          post_type,
          post_category,
          post_status,
          lesson_avatar {
            media_name,
            media_path
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
          is_reported,
          report_notes,
          report_sender,
          report_counter,
          reported_date,
          report_controllers
        },
        all_questionproducts {
          ID,
          post_title,
          post_content,
          post_author,
          post_date,
          post_type,
          post_category,
          post_status,
          question_imgs {
            media_name,
            media_path
          },
          question_avatar {
            media_name,
            media_path
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
          },
          is_reported,
          report_notes,
          report_sender,
          report_counter,
          reported_date,
          report_controllers
        }
      }
    }
      `
  }).valueChanges;

}
