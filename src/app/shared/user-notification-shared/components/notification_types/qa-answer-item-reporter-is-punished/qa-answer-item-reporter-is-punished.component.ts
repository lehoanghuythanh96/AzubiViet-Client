import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlReportQAQuestionComponent } from 'src/app/controllers/main-landing-page/children/landing-home-page/children/qand-abox/children/control-report-qa-question/control-report-qa-question.component';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';
import { UserNotificationLocalService } from '../../../LocalService/user-notification-local.service';

@Component({
  selector: 'app-qa-answer-item-reporter-is-punished',
  templateUrl: './qa-answer-item-reporter-is-punished.component.html',
  styleUrls: ['./qa-answer-item-reporter-is-punished.component.scss']
})
export class QAAnswerItemReporterIsPunishedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor(
    private dialog: MatDialog,
    private localService: UserNotificationLocalService
  ) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    let foundItem = this.localService.allQAs.find(
      y => y.ID == this.item.data.QA_ID
    )
    if (foundItem && this.item.data.QA_Question_ID) {
      let foundQuestionItem = this.localService.allQAs.find(
        y => y.ID == this.item.data.QA_Question_ID
      )
      const dialogRef = this.dialog.open(ControlReportQAQuestionComponent, {
        width: '400px',
        data: {
          QA_Item: foundItem,
          noti_type: 'answerReporter_isPunished',
          noti_ID: this.item.ID,
          QA_Question_Item: foundQuestionItem
        },
      });
    }
  }

}
