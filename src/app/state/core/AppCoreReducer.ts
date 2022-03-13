import { createFeatureSelector } from '@ngrx/store';
import { UserAuthReducer, UserAuthState } from 'src/app/state/userauthentication/userlogin.reducer';
import { AdminInfoReducer, AdminInfoState } from '../admininfo/admininfo.reducer';
import { LessonInfoReducer, LessonInfoState } from '../lessoninfo/lessoninfo.reducer';
import { MainLandingPageInfoReducer, MainLandingPageInfoState } from '../mainLandingPage/mainlanding.reducer';
import { QuestionMarketInfoReducer, QuestionMarketInfoState } from '../questionmarketinfo/questionmarketinfo.reducer';
import { UserNotificationReducer, UserNotificationState } from '../usernotification/usernotification.reducer';

export interface AppDataGeneralState {
  userauthinfo: UserAuthState,
  admininfo: AdminInfoState,
  lessoninfo: LessonInfoState,
  questionmarketinfo: QuestionMarketInfoState,
  usernotifications: UserNotificationState,
  mainlandingpageInfo: MainLandingPageInfoState
}

export const AppCoreReducers = {
  userauthinfo: UserAuthReducer,
  admininfo: AdminInfoReducer,
  lessoninfo: LessonInfoReducer,
  questionmarketinfo: QuestionMarketInfoReducer,
  usernotifications: UserNotificationReducer,
  mainlandingpageInfo: MainLandingPageInfoReducer
};

export const AppSelector = createFeatureSelector<AppDataGeneralState>("AppCoreReducers")