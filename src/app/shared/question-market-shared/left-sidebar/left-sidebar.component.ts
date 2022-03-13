import { Component, OnInit } from '@angular/core';
import { MainMenuItems } from 'src/app/models/mainMenuItems/mainMenuItems.entity';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  items = MainMenuItems

  constructor() { }

  ngOnInit(): void {
  }

}
