import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil, skipWhile } from 'rxjs/operators';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { UserNotificationAction } from 'src/app/state/usernotification/usernotification.action';
import { environment } from 'src/environments/environment';
import { QuestionMarketLocalService } from '../LocalService/question-market-local.service';

@Component({
  selector: 'app-question-market-layout',
  templateUrl: './question-market-layout.component.html',
  styleUrls: ['./question-market-layout.component.scss']
})
export class QuestionMarketLayoutComponent implements OnInit {

  constructor(
    private store: Store,
    private _localService: QuestionMarketLocalService,
    private socket: Socket,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  get openRightSideBar() {
    return this._localService.openRightSideBar
  }

  get openLeftSideBar() {
    return this._localService.openLeftSideBar
  }

  get isLargeScreen() {
    return this._localService.isLargeScreen
  }

  rightSidebarMovement(event: any) { 
    this._localService.openRightSideBar = event
  }

  leftSidebarMovement(event: any) { 
    this._localService.openLeftSideBar = event
  }

  ngOnInit(): void {
    this.store.dispatch(QuestionmarketInfoAction())

    this._localService.openLeftSideBar = false
    this._localService.openRightSideBar = false
    
    this.store.select(AppSelector).pipe(
      takeUntil(this.destroy$),
      skipWhile(x => !x.questionmarketinfo.questionmarketinfo.product_tree)
    ).subscribe(
      x => {

        this._localService.questionmarketinfo$.next(x.questionmarketinfo)

        let _area = x.questionmarketinfo.questionmarketinfo.product_tree;
        let _catlist = _area?.map(y => y.child_category_questionproduct)
        let _templist: Array<any> = [];
        _catlist!.forEach(x => {
          let lessonarr = x.map(x => x.child_lessons);
          let _lessonarr = lessonarr.reduce((callback: Array<any>, current) => callback.concat(current), [])
          _templist.push(_lessonarr);
        })
        let __templist: PostEntity[] = _templist.reduce(
          (callback: Array<PostEntity>, current) => callback.concat(current), []
        )
        let _productlist = __templist.filter(
          (value, index, self) => index == self.findIndex(
            (t) => (t.ID == value.ID)
          )
        )
        this._localService.addquestionproduct.cdnfolder = environment.BASE_CDN_URL + '/' + x.questionmarketinfo.questionmarketinfo.defaultconfig?.postimg_path
        this._localService.user_img_path = environment.BASE_CDN_URL + '/' + x.questionmarketinfo.questionmarketinfo.defaultconfig?.userimg_path
        let _tempcatList = _area?.map(y => y.child_category_questionproduct.map(
          y => {
            return {
              ID: y.ID,
              category_name: y.category_name
            }
          }
        ))
        this._localService.catList = _tempcatList?.reduce((acc: Array<any>, item) => acc.concat(item), [])
        this._localService.allquestions$.next(_productlist)
      }
    )

    this.socket.on(emitNames.reloadNotifications,
      () => {
        this.store.dispatch(QuestionmarketInfoAction())
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

            if (
              Breakpoints.Large.includes(query) ||
              Breakpoints.XLarge.includes(query)
            ) {
              this._localService.isLargeScreen = true
            } else {
              this._localService.isLargeScreen = false
            }
          }
        }
      });
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
