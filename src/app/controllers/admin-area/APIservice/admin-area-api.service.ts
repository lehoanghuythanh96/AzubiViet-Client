import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAreaAPIService {

  constructor(
    private apollo: Apollo
  ) { }

  getadmininfoapi: Observable<any> = this.apollo.watchQuery({
    query: gql`
          {
            admininfo
            {
              lessons {
                ID,
                post_title,
                post_content,
                post_date,
                post_category,
                post_avatar {
                  media_name,
                  media_path
                }
              },
              arealist {
                ID,
                area_name
              },
              lessoncatlist {
                ID,
                category_name,
                area_ID
              },
              report_loggers {
                ID,
                report_notes,
                report_date,
                report_sender,
                report_controllers,
                parent_ID,
                report_type,
                finished
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
