import { Component, OnInit } from '@angular/core';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private localService: QuestionMarketLocalService
  ) { }

  ngOnInit(): void {
  }

  toggleRightSidebar() {

    this.localService.openLeftSideBar = false;
    this.localService.openRightSideBar = !this.localService.openRightSideBar;
    
  }

  toggleLeftSidebar() {

    this.localService.openRightSideBar = false;
    this.localService.openLeftSideBar = !this.localService.openLeftSideBar;

  }

}
