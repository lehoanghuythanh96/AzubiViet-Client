import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-question-product-is-reported',
  templateUrl: './question-product-is-reported.component.html',
  styleUrls: ['./question-product-is-reported.component.scss']
})
export class QuestionProductIsReportedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
