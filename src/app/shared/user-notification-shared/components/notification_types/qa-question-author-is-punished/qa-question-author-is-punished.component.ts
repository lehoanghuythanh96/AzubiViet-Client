import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ControlReportQAQuestionComponent } from 'src/app/controllers/main-landing-page/children/landing-home-page/children/qand-abox/children/control-report-qa-question/control-report-qa-question.component';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';
import { UserNotificationLocalService } from '../../../LocalService/user-notification-local.service';

@Component({
  selector: 'app-qa-question-author-is-punished',
  templateUrl: './qa-question-author-is-punished.component.html',
  styleUrls: ['./qa-question-author-is-punished.component.scss']
})
export class QAQuestionAuthorIsPunishedComponent implements OnInit {

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
    if (foundItem) {
      const dialogRef = this.dialog.open(ControlReportQAQuestionComponent, {
        width: '400px',
        data: {
          QA_Item: foundItem,
          noti_type: 'questionAuthor_isPunished',
          noti_ID: this.item.ID
        },
      });
    }
  }

}
