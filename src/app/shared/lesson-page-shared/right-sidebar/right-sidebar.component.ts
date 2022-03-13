import { Component, OnInit } from '@angular/core';
import { LessonPageLocalService } from 'src/app/controllers/lesson-page/LocalService/lesson-page-local.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(
    private localService: LessonPageLocalService
  ) { }

  ngOnInit(): void {
  }

  toggleRightSidebar() {
    this.localService.openRightSideBar = !this.localService.openRightSideBar;
  }

}
