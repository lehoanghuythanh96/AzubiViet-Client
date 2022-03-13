import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LessonCategoryEntity } from 'src/app/models/lessoncategoryentity/lessoncategory.entity';
import { LessonInfo } from 'src/app/models/lessoninfo/lessoninfo.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { LessonInfoState } from 'src/app/state/lessoninfo/lessoninfo.reducer';

@Injectable({
  providedIn: 'root'
})
export class LessonPageLocalService {

  openLeftSideBar = false;
  openRightSideBar = false

  alllesson$ = new BehaviorSubject<PostEntity[]>([]);
  catList$ = new BehaviorSubject<LessonCategoryEntity[]>([])

  cdnpath: string = '';

  constructor() { }

  lessoninfo$ = new BehaviorSubject<LessonInfoState | undefined>(undefined);

  isMobile = false;
  isLargeScreen = false;
}
