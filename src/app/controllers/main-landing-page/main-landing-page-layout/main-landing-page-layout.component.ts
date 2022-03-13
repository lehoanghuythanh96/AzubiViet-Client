import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo, gql } from 'apollo-angular';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { removelocaldata } from 'src/app/shared/localFns/local-functions.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { MainLandingPageAction } from 'src/app/state/mainLandingPage/mainlanding.action';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { MainLandingPageLocalService } from '../LocalService/main-landing-page-local.service';

@Component({
  selector: 'app-main-landing-page-layout',
  templateUrl: './main-landing-page-layout.component.html',
  styleUrls: ['./main-landing-page-layout.component.scss']
})
export class MainLandingPageLayoutComponent implements OnInit {

  constructor(
    private store: Store,
    private apollo: Apollo,
    private _localService: MainLandingPageLocalService,
    private socket: Socket,
    private breakpointObserver: BreakpointObserver
  ) { }

  get openRightSideBar() {
    return this._localService.openRightSideBar
  }

  get isMobile() {
    return this._localService.isMobile
  }

  rightSidebarMovement(event: any) {
    this._localService.openRightSideBar = event
  }

  ngOnInit(): void {

    this.store.dispatch(MainLandingPageAction())
    this.store.select(AppSelector).pipe(
      takeUntil(this.destroy$),
      skipWhile(
        y => !y.mainlandingpageInfo
      )
    ).subscribe(
      x => {
        this._localService.mainlandingpageInfo$.next(x.mainlandingpageInfo)
      }
    )

    this.apollo.watchQuery({
      query: gql`
        query user_info {
          user_info {
            ID,
            user_name,
            user_role,
            user_level,
            levelup_points,
            user_experience,
            user_avatar {
              media_name,
              media_path
            },
            gender,
            defaultconfig {
              userimg_path,
              QA_img_path
            }
          }
        }
      `
    }).valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      (x: any) => {
        this._localService.userinfo = x.data.user_info;
        this._localService.userinfo$.next(x.data.user_info)
      },
      error => {
        return
      }
    )

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            if (
              Breakpoints.XSmall.includes(query) ||
              Breakpoints.Small.includes(query)
            ) {
              this._localService.isMobile = true;
            } else {
              this._localService.isMobile = false;
            }
          }
        }
      });

    this.socket.on(emitNames.reloadNotifications,
      () => {
        this.store.dispatch(MainLandingPageAction())
      }
    )
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  logOut() {
    removelocaldata();
  }
}
