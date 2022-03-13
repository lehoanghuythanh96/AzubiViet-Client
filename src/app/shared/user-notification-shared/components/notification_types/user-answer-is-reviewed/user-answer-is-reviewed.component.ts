import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-user-answer-is-reviewed',
  templateUrl: './user-answer-is-reviewed.component.html',
  styleUrls: ['./user-answer-is-reviewed.component.scss']
})
export class UserAnswerIsReviewedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
