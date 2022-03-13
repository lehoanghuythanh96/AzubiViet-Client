import { Component, OnInit } from '@angular/core';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  constructor(
    private localService: QuestionMarketLocalService
  ) { }

  ngOnInit(): void {
  }

  toggleRightSidebar() {
    this.localService.openRightSideBar = !this.localService.openRightSideBar;
  }

}
