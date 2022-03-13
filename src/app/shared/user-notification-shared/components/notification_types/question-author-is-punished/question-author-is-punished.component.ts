import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-question-author-is-punished',
  templateUrl: './question-author-is-punished.component.html',
  styleUrls: ['./question-author-is-punished.component.scss']
})
export class QuestionAuthorIsPunishedComponent implements OnInit {

  @Input()
  item!: UserNotification;
  
  constructor() { }

  ngOnInit(): void {
  }

}
