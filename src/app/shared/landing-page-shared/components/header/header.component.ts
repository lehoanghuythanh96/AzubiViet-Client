import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MainLandingPageLocalService } from 'src/app/controllers/main-landing-page/LocalService/main-landing-page-local.service';
import { removelocaldata } from 'src/app/shared/localFns/local-functions.service';
import { UserLoginCardComponent } from 'src/app/shared/user-authentication-shared/components/user-login-card/user-login-card.component';
import { UserProfileCardComponent } from 'src/app/shared/user-authentication-shared/components/user-profile-card/user-profile-card.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get userinfo() {
    return this.localService.userinfo
  }

  constructor(
    private dialog: MatDialog,
    private localService: MainLandingPageLocalService,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }

  openLoginDialog() {
    this._bottomSheet.open(
      UserLoginCardComponent
    );
  }

  checkInfo() {
    this._bottomSheet.open(
      UserProfileCardComponent
    )
  }

  logOut() {
    removelocaldata();
    window.location.reload();
  }

  toggleRightSidebar() {
    this.localService.openRightSideBar = !this.localService.openRightSideBar;
  }

}
