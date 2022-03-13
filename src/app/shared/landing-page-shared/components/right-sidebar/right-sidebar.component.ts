import { Component, OnInit } from '@angular/core';
import { MainLandingPageLocalService } from 'src/app/controllers/main-landing-page/LocalService/main-landing-page-local.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(
    private localService: MainLandingPageLocalService
  ) { }

  ngOnInit(): void {
  }

  toggleRightSidebar() {
    this.localService.openRightSideBar = !this.localService.openRightSideBar;
  }

}
