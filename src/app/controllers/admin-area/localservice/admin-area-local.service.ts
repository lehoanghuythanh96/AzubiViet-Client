import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminInfo } from 'src/app/models/admininfo/admininfo.interface';
import { AdminInfoState } from 'src/app/state/admininfo/admininfo.reducer';
import { newLessonBody } from '../children/add-new-lesson/add-new-lesson.component';

@Injectable({
  providedIn: 'root'
})
export class AdminAreaLocalService {

  constructor() { }

  addlesson: {
    area_ID: number | null;
    cat_ID: number[];
    neworedit: boolean;
    editID: number;
  } = {
      area_ID: null,
      cat_ID: [],
      neworedit: true,
      editID: 0
    }

  _lessonarea$ = new Subject<number | null>();

  editlesson$ = new Subject<newLessonBody>();

  admininfo$ = new BehaviorSubject<AdminInfoState | undefined>(undefined)
}

