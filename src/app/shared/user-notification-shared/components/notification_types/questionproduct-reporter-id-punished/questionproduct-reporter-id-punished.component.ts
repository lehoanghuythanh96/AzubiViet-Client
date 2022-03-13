import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-questionproduct-reporter-id-punished',
  templateUrl: './questionproduct-reporter-id-punished.component.html',
  styleUrls: ['./questionproduct-reporter-id-punished.component.scss']
})
export class QuestionproductReporterIdPunishedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
