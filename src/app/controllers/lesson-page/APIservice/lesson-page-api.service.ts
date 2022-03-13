import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonPageAPIService {

  constructor(
    private apollo: Apollo
  ) { }

  getlessoninfoapi: Observable<any> = this.apollo.watchQuery({
    query: gql`
    { lesson_page 
      {
        lesson_tree {
          ID,
          area_name,
          child_category_lesson { 
            ID, 
            category_name,
            area_ID,
            child_lessons {
              ID,
              post_title,
              post_content,
              post_author,
              post_date,
              post_type,
              post_category,
              post_status,
              post_avatar {
                media_name,
                media_path
              }
            } 
          } 
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
          }
        },
        defaultconfig {
          postimg_path,
          default_post_avatar
        }
      }
    }
      `
  }).valueChanges;

}
