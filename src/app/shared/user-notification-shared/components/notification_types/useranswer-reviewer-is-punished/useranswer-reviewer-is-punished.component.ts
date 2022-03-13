import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-useranswer-reviewer-is-punished',
  templateUrl: './useranswer-reviewer-is-punished.component.html',
  styleUrls: ['./useranswer-reviewer-is-punished.component.scss']
})
export class UseranswerReviewerIsPunishedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
