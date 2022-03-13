import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil, skipWhile } from 'rxjs/operators';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { UserNotificationLocalService } from '../../LocalService/user-notification-local.service';

@Component({
  selector: 'app-user-notification-card',
  templateUrl: './user-notification-card.component.html',
  styleUrls: ['./user-notification-card.component.scss']
})
export class UserNotificationCardComponent implements OnInit {

  allnotifications: UserNotification[] = [];

  NotiTypes = NotiTypes;

  constructor(
    private store: Store,
    private apollo: Apollo,
    private _snackbar: MatSnackBar,
    private localService: UserNotificationLocalService,
    private socket: Socket
  ) { }

  ngOnInit(): void {

    if (localStorage.getItem('access_token')) {
      this.store.dispatch(UserNotificationAction())
    }

    this.socket.on(emitNames.reloadNotifications,
      () => {
        this.store.dispatch(UserNotificationAction())
      }
    )

    this.store.select(AppSelector).pipe(
      takeUntil(this.destroy$),
      skipWhile(x => !x.usernotifications.usernotifications)
    ).subscribe(
      x => {

        let sorter = (a: any, b: any) => {
          return b.ID - a.ID;
        }

        this.allnotifications = [...x.usernotifications.usernotifications!].sort(sorter);

        this.apollo.watchQuery({
          query: gql`
            query guest_QAs {
              guest_QAs {
                ID,
                item_content,
                user_email,
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
                report_controllers
              }
            }
          `
        }).valueChanges.pipe(
          takeUntil(this.destroy$)
        ).subscribe(
          (y: any) => {
            this.localService.allQAs = y.data.guest_QAs
          },
          (error) => {
            console.log(error.message)
            this._snackbar.open(error.message, "Close")
          }
        )

      }
    )

  }

  async deleteNotiWithID(
    noti_ID: number,
    noti_type: string
  ) {

    this.apollo.mutate({
      mutation: gql`
        mutation delete_single_notification ($noti_type: String!, $noti_ID: Float!) {
          delete_single_notification (notification_type: $noti_type, notification_ID: $noti_ID)
        }
      `,
      variables: {
        noti_type,
        noti_ID
      }
    }).subscribe(
      result => {
        this.store.dispatch(UserNotificationAction())
        this._snackbar.open("Delete successfully")
      },
      (error) => {
        console.log(error.message)
        this._snackbar.open(error.message, "Close")
      }
    )

  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

}

export const NotiTypes = {
  please_check_user_answer: 'user_answer',
  review_isLiked: 'review_isLiked',
  answer_isReviewed: 'answer_isReviewed',
  answer_isReported: 'answer_isReported',
  answerer_isPunished: 'answerer_isPunished',
  user_answer_reporter_isPunished: 'useranswer_reporter_isPunished',
  useranswer_review_isReported: "useranswer_review_isReported",
  useranswer_reviewer_isPunished: "useranswer_reviewer_isPunished",
  useranswer_review_Reporter_isPunished: "useranswer_review_Reporter_isPunished",
  questionProduct_isReported : "questionProduct_isReported",
  questionAuthor_isPunished : "questionAuthor_isPunished",
  questionProduct_Reporter_isPunished : "questionProduct_Reporter_isPunished",
  QA_QuestionItem_isReported : "QA_QuestionItem_isReported",
  QA_QuestionAuthor_isPunished : "QA_QuestionAuthor_isPunished",
  QA_QuestionItem_Reporter_isPunished : "QA_QuestionItem_Reporter_isPunished",
  QA_AnswerItem_isReported : "QA_AnswerItem_isReported",
  QA_AnswerAuthor_isPunished : "QA_AnswerAuthor_isPunished",
  QA_AnswerItem_Reporter_isPunished : "QA_AnswerItem_Reporter_isPunished",
}
