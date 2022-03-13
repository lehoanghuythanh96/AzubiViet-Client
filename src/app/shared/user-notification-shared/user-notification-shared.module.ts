import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserNotificationCardComponent } from './components/user-notification-card/user-notification-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { QAQuestionItemIsReportedComponent } from './components/notification_types/qa-question-item-is-reported/qa-question-item-is-reported.component';
import { QuestionAuthorIsPunishedComponent } from './components/notification_types/question-author-is-punished/question-author-is-punished.component';
import { QuestionMarketReviewUserAnswerComponent } from './components/notification_types/question-market-review-user-answer/question-market-review-user-answer.component';
import { QuestionProductIsReportedComponent } from './components/notification_types/question-product-is-reported/question-product-is-reported.component';
import { QuestionproductReporterIdPunishedComponent } from './components/notification_types/questionproduct-reporter-id-punished/questionproduct-reporter-id-punished.component';
import { TheAnswererIsPunishedComponent } from './components/notification_types/the-answerer-is-punished/the-answerer-is-punished.component';
import { UserAnswerIsReportedComponent } from './components/notification_types/user-answer-is-reported/user-answer-is-reported.component';
import { UserAnswerIsReviewedComponent } from './components/notification_types/user-answer-is-reviewed/user-answer-is-reviewed.component';
import { UserAnswerReporterIsPunishedComponent } from './components/notification_types/user-answer-reporter-is-punished/user-answer-reporter-is-punished.component';
import { UserAnswerReviewIsReportedComponent } from './components/notification_types/user-answer-review-is-reported/user-answer-review-is-reported.component';
import { UserReviewIsLikedComponent } from './components/notification_types/user-review-is-liked/user-review-is-liked.component';
import { UseranswerReviewReporterIsPunishedComponent } from './components/notification_types/useranswer-review-reporter-is-punished/useranswer-review-reporter-is-punished.component';
import { UseranswerReviewerIsPunishedComponent } from './components/notification_types/useranswer-reviewer-is-punished/useranswer-reviewer-is-punished.component';
import { QAQuestionAuthorIsPunishedComponent } from './components/notification_types/qa-question-author-is-punished/qa-question-author-is-punished.component';
import { QAQuestionItemReporterIsPunishedComponent } from './components/notification_types/qa-question-item-reporter-is-punished/qa-question-item-reporter-is-punished.component';
import { QAAnswerItemIsReportedComponent } from './components/notification_types/qa-answer-item-is-reported/qa-answer-item-is-reported.component';
import { QAAnswerAuthorIsPunishedComponent } from './components/notification_types/qa-answer-author-is-punished/qa-answer-author-is-punished.component';
import { QAAnswerItemReporterIsPunishedComponent } from './components/notification_types/qa-answer-item-reporter-is-punished/qa-answer-item-reporter-is-punished.component';
import { EffectsModule } from '@ngrx/effects';
import { UserNotificationEffects } from 'src/app/state/usernotification/usernotification.effect';



@NgModule({
  declarations: [
    UserNotificationCardComponent,
    QuestionMarketReviewUserAnswerComponent,
    UserReviewIsLikedComponent,
    UserAnswerIsReviewedComponent,
    UserAnswerIsReportedComponent,
    TheAnswererIsPunishedComponent,
    UserAnswerReporterIsPunishedComponent,
    UserAnswerReviewIsReportedComponent,
    UseranswerReviewerIsPunishedComponent,
    UseranswerReviewReporterIsPunishedComponent,
    QuestionProductIsReportedComponent,
    QuestionAuthorIsPunishedComponent,
    QuestionproductReporterIdPunishedComponent,
    QAQuestionItemIsReportedComponent,
    QAQuestionAuthorIsPunishedComponent,
    QAQuestionItemReporterIsPunishedComponent,
    QAAnswerItemIsReportedComponent,
    QAAnswerAuthorIsPunishedComponent,
    QAAnswerItemReporterIsPunishedComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    EffectsModule.forFeature([
      UserNotificationEffects
    ]),
  ],
  exports: [
    UserNotificationCardComponent
  ]
})
export class UserNotificationSharedModule { }
