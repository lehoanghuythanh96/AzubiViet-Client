import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { LessonPageLocalService } from 'src/app/controllers/lesson-page/LocalService/lesson-page-local.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  topicbtntoggle = false;

  viewallbtntoggle = false;

  constructor(
    private _localService: LessonPageLocalService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this._localService.lessoninfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x || !x.lessoninfo
      )
    ).subscribe(
      x => {
        if (x!.choosed_area != 0) {
          this.topicbtntoggle = true;
        }
      }
    )
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  toggleRightSidebar() {

    this._localService.openLeftSideBar = false;
    this._localService.openRightSideBar = !this._localService.openRightSideBar;
    
  }

  toggleLeftSidebar() {

    this._localService.openRightSideBar = false;
    this._localService.openLeftSideBar = !this._localService.openLeftSideBar;

  }

}
