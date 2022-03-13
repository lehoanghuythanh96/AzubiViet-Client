import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, skipWhile, takeUntil } from 'rxjs/operators';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { LessonInfoChooseArea } from 'src/app/state/lessoninfo/lessoninfo.action';
import { LessonPageLocalService } from '../../LocalService/lesson-page-local.service';

@Component({
  selector: 'app-lesson-page-home',
  templateUrl: './lesson-page-home.component.html',
  styleUrls: ['./lesson-page-home.component.scss']
})
export class LessonPageHomeComponent implements OnInit {

  arealist$!: Observable<any>;

  constructor(
    private store: Store,
    private router: Router,
    private localService: LessonPageLocalService
  ) { }

  ngOnInit(): void {
    this.arealist$ = this.localService.lessoninfo$.pipe(
      skipWhile(
        y => !y || !y.lessoninfo || !y.lessoninfo.lesson_tree
      ),
      map(x => x!.lessoninfo.lesson_tree)
    )
  }

  movetoarea(ID: number) {
    this.store.dispatch(LessonInfoChooseArea({ area_ID: ID }));
    this.router.navigate(['/learning/chooselesson'])
  }
}
