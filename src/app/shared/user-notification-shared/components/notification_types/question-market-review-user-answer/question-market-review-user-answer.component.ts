import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-question-market-review-user-answer',
  templateUrl: './question-market-review-user-answer.component.html',
  styleUrls: ['./question-market-review-user-answer.component.scss']
})
export class QuestionMarketReviewUserAnswerComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
