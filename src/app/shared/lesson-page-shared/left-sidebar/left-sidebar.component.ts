import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, skipWhile, takeUntil } from 'rxjs/operators';
import { LessonPageLocalService } from 'src/app/controllers/lesson-page/LocalService/lesson-page-local.service';
import { MainMenuItems } from 'src/app/models/mainMenuItems/mainMenuItems.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { LessonInfoAction } from 'src/app/state/lessoninfo/lessoninfo.action';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

  items = MainMenuItems

  arealist$!: Observable<any>;

  constructor(
    private store: Store,
    private router: Router,
    private _localService: LessonPageLocalService
  ) { }

  ngOnInit(): void {

    this.arealist$ = this._localService.lessoninfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        y => !y || !y.lessoninfo || !y.lessoninfo.lesson_tree
      ),
      map(
        y => y!.lessoninfo.lesson_tree?.filter(
            z => z.ID == y!.choosed_area
          )
      )
    )
  }
  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
