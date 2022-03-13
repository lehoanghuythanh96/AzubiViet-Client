import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-useranswer-review-reporter-is-punished',
  templateUrl: './useranswer-review-reporter-is-punished.component.html',
  styleUrls: ['./useranswer-review-reporter-is-punished.component.scss']
})
export class UseranswerReviewReporterIsPunishedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
