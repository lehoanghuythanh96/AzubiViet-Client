import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { LessonCategoryEntity } from 'src/app/models/lessoncategoryentity/lessoncategory.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { LessonInfoAction } from 'src/app/state/lessoninfo/lessoninfo.action';
import { environment } from 'src/environments/environment';
import { LessonPageLocalService } from '../LocalService/lesson-page-local.service';

@Component({
  selector: 'app-lesson-page-layout',
  templateUrl: './lesson-page-layout.component.html',
  styleUrls: ['./lesson-page-layout.component.scss']
})
export class LessonPageLayoutComponent implements OnInit {

  get openRightSideBar() {
    return this._localservice.openRightSideBar
  }

  get openLeftSideBar() {
    return this._localservice.openLeftSideBar
  }

  get isLargeScreen() {
    return this._localservice.isLargeScreen
  }

  rightSidebarMovement(event: any) { 
    this._localservice.openRightSideBar = event
  }

  leftSidebarMovement(event: any) { 
    this._localservice.openLeftSideBar = event
  }

  constructor(
    private _localservice: LessonPageLocalService,
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.store.dispatch(LessonInfoAction())

    this._localservice.openLeftSideBar = false
    this._localservice.openRightSideBar = false

    this.store.select(AppSelector).pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x.lessoninfo.lessoninfo || !x.lessoninfo.lessoninfo.lesson_tree
      )
    ).subscribe(
      x => {

        let allAreas = x.lessoninfo.lessoninfo.lesson_tree!
        let _catList: Array<LessonCategoryEntity> = []

        allAreas.forEach(
          item => {
            _catList = _catList.concat(item.child_category_lesson)
          }
        )

        this._localservice.lessoninfo$.next(x.lessoninfo)

        this._localservice.catList$.next(_catList)

        this._localservice.alllesson$.next(x.lessoninfo.lessoninfo.all_lessons!)

        this._localservice.cdnpath = environment.BASE_CDN_URL + '/' + x.lessoninfo.lessoninfo.defaultconfig?.postimg_path;
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
              this._localservice.isMobile = true;
            } else {
              this._localservice.isMobile = false;
            }

            if (
              Breakpoints.Large.includes(query) ||
              Breakpoints.XLarge.includes(query)
            ) {
              this._localservice.isLargeScreen = true
            } else {
              this._localservice.isLargeScreen = false
            }
          }
        }
      });
    
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

}
