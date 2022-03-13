import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-user-answer-is-reported',
  templateUrl: './user-answer-is-reported.component.html',
  styleUrls: ['./user-answer-is-reported.component.scss']
})
export class UserAnswerIsReportedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
