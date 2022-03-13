import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { LessonCategoryEntity } from 'src/app/models/lessoncategoryentity/lessoncategory.entity';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';
import { LessonPageLocalService } from '../../LocalService/lesson-page-local.service';

@Component({
  selector: 'app-single-lesson',
  templateUrl: './single-lesson.component.html',
  styleUrls: ['./single-lesson.component.scss']
})
export class SingleLessonComponent implements OnInit {

  lessontoview!: PostEntity;
  lessontoview_content: any;

  cattoview!: LessonCategoryEntity[]

  get cdnpath() {
    return this._localService.cdnpath
  }

  constructor(
    private store: Store,
    private router: Router,
    private _localService: LessonPageLocalService,
    private route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {

    combineLatest([
      this.route.queryParams.pipe(
        skipWhile(
          x => !x.ID
        )
      ),
      this._localService.alllesson$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => x.length == 0
        )
      ),
      this._localService.catList$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => x.length == 0
        )
      ),
      this._localService.lessoninfo$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x || !x.lessoninfo
        )
      )
    ]).subscribe(
      async (vals) => {
        let params = vals[0];
        if (params.ID && params.ID != 0) {

          let _temppost: PostEntity = vals[1].find(y => y.ID == params.ID)!;
          let _el = new DOMParser().parseFromString(_temppost.post_content, "text/html");
          var _imgarr = _el.querySelectorAll('img');
          this.lessontoview_content = _temppost.post_content;
          for (var i = 0; i < _imgarr.length; i++) {
            let _begin: string = <any>_imgarr[i].getAttribute('src');
            let _end = environment.BASE_CDN_URL + '/' + _begin;
            this.lessontoview_content = this.lessontoview_content.replace(_begin, _end);
          }
          this.lessontoview = _temppost;
          this.cattoview = vals[2].filter(y => this.lessontoview.post_category.includes(y.ID));

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

}

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  template =
    `<style>
    #maincontent{
      overflow-x:scroll;
    }
    #maincontent img {
      width:auto;
      height:fit-content;
      max-width:40%;
      max-height: 300px;
      justify-self: center;
    }
    #maincontent p {
      display: block;
      align-items: center;
      width: 100%;
    }
    #maincontent p>img {
      margin: 1rem
    }
  </style>`;

  transform(value: any) {
    value = value + this.template;
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}