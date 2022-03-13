import { Component, Input, OnInit } from '@angular/core';
import { UserNotification } from 'src/app/models/userNotification/user_notification.entity';

@Component({
  selector: 'app-the-answerer-is-punished',
  templateUrl: './the-answerer-is-punished.component.html',
  styleUrls: ['./the-answerer-is-punished.component.scss']
})
export class TheAnswererIsPunishedComponent implements OnInit {

  @Input()
  item!: UserNotification;

  constructor() { }

  ngOnInit(): void {
  }

}
