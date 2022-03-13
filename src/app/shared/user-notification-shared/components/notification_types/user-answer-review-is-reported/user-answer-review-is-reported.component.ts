import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-user-answer-review-is-reported',
  templateUrl: './user-answer-review-is-reported.component.html',
  styleUrls: ['./user-answer-review-is-reported.component.scss']
})
export class UserAnswerReviewIsReportedComponent implements OnInit {

  @Input()
  item!: UserNotification;
  
  constructor() { }

  ngOnInit(): void {
  }

}
