import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-user-answer-reporter-is-punished',
  templateUrl: './user-answer-reporter-is-punished.component.html',
  styleUrls: ['./user-answer-reporter-is-punished.component.scss']
})
export class UserAnswerReporterIsPunishedComponent implements OnInit {


  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
