import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';
import { LessonPageLocalService } from '../../LocalService/lesson-page-local.service';

@Component({
  selector: 'app-choose-lesson-page',
  templateUrl: './choose-lesson-page.component.html',
  styleUrls: ['./choose-lesson-page.component.scss']
})
export class ChooseLessonPageComponent implements OnInit {

  lessoninfo: Array<PostEntity> = [];
  _lessoninfoforsearch: Array<PostEntity> = [];

  get cdnpath() {
    return this._localService.cdnpath
  }

  searchKey = new FormControl('')

  catlist!: Array<any> | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private _localService: LessonPageLocalService,
  ) {
    
    this.searchKey.valueChanges.subscribe(
      y => {
        this.lessoninfo = this._lessoninfoforsearch.filter(
          item => item.post_title.toLowerCase().includes(y.toLowerCase()) || item.post_content.toLowerCase().includes(y.toLowerCase())
        )
      }
    )

  }

  ngOnInit(): void {

    combineLatest([
      this._localService.catList$.pipe(
        takeUntil(this.destroy$)
      ),
      this._localService.lessoninfo$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x?.lessoninfo
        )
      ),
      this._localService.alllesson$.pipe(
        takeUntil(this.destroy$)
      )
    ]).subscribe(
      vals => {

        if (vals[1]!.choosed_area == 0) {
          this.router.navigate(['/learning'])
          return
        }

        let filteredCats = vals[0].filter(
          y => y.area_ID == vals[1]!.choosed_area
        ).map(
          y => y.ID
        )

        this.lessoninfo = vals[2].filter(
          y => {
            let _begin = false;
            y.post_category.forEach(
              item => {
                if (filteredCats.includes(item)) {
                  _begin = true;
                }
              }
            )
            return _begin;
          }
        )

          this._lessoninfoforsearch = [...this.lessoninfo]

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

  toggleLeftSidebar() {

    this._localService.openRightSideBar = false;
    this._localService.openLeftSideBar = !this._localService.openLeftSideBar;

  }

}
