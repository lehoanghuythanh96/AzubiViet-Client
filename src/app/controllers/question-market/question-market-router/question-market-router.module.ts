import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionMarketLayoutComponent } from '../question-market-layout/question-market-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { QuestionMarketLandingPageComponent } from '../children/question-market-landing-page/question-market-landing-page.component';
import { ManagePrivateProfilePageComponent } from '../children/manage-private-profile-page/manage-private-profile-page.component';
import { AnswerReviewPageComponent } from '../children/answer-review-page/answer-review-page.component';
import { QuestionManagerPageComponent } from '../children/manage-private-profile-page/children/question-manager-page/question-manager-page.component';
import { QuestionDetailPageComponent } from '../children/question-detail-page/question-detail-page.component';
import { CheckReviewPageComponent } from '../children/check-review-page/check-review-page.component';
import { MarketPageComponent } from '../children/market-page/market-page.component';
import { ControlAnswerReportComponent } from '../children/control-answer-report/control-answer-report.component';
import { ControlQuestionReportComponent } from '../children/control-question-report/control-question-report.component';
import { ItemShopPageComponent } from '../children/item-shop-page/item-shop-page.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionMarketLayoutComponent,
    children: [
      {
        path: '',
        component: QuestionMarketLandingPageComponent
      },
      {
        path: 'userprofile',
        component: ManagePrivateProfilePageComponent
      },
      {
        path: 'reviewanswer',
        component: AnswerReviewPageComponent
      },
      {
        path: 'managequestions',
        component: QuestionManagerPageComponent
      },
      {
        path: 'singlequestion',
        component: QuestionDetailPageComponent
      },
      {
        path: 'checkreview',
        component: CheckReviewPageComponent
      },
      {
        path: 'market',
        component: MarketPageComponent
      },
      {
        path: 'checkreport',
        component: ControlAnswerReportComponent
      },
      {
        path: 'controlquestionreport',
        component: ControlQuestionReportComponent
      },
      {
        path: 'itemshop',
        component: ItemShopPageComponent
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class QuestionMarketRouterModule { }
