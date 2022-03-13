import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { MainLandingPageInfoState } from 'src/app/state/mainLandingPage/mainlanding.reducer';

@Injectable({
  providedIn: 'root'
})
export class MainLandingPageLocalService {

  userinfo!: UserEntity;
  userinfo$ = new BehaviorSubject<UserEntity | undefined>(undefined)

  constructor() { }

  openRightSideBar = false;
  isMobile = false;

  mainlandingpageInfo$ = new BehaviorSubject<MainLandingPageInfoState | undefined>(undefined)
  
}
