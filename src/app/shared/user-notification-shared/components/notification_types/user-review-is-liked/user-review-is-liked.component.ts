import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-user-review-is-liked',
  templateUrl: './user-review-is-liked.component.html',
  styleUrls: ['./user-review-is-liked.component.scss']
})
export class UserReviewIsLikedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
