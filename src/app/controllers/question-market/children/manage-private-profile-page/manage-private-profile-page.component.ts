import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { UserAnswerReviewEntity } from 'src/app/models/userAnswerReview/useranswerreview.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';
import { MatDialog } from '@angular/material/dialog';
import { PrivateUserAnswerTableComponent } from './children/private-user-answer-table/private-user-answer-table.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AnswerReviewsTableComponent } from './children/answer-reviews-table/answer-reviews-table.component';
import { UserProfileCardComponent } from 'src/app/shared/user-authentication-shared/components/user-profile-card/user-profile-card.component';

@Component({
  selector: 'app-manage-private-profile-page',
  templateUrl: './manage-private-profile-page.component.html',
  styleUrls: ['./manage-private-profile-page.component.scss']
})
export class ManagePrivateProfilePageComponent implements OnInit {

  questions: PostEntity[] = []
  reviews: UserAnswerReviewEntity[] = []

  manageQuestions = () => {
    this.router.navigate(['/questionmarket/managequestions'])
  }
  manageAnswers() {
    this._bottomSheet.open(
      PrivateUserAnswerTableComponent
    )
  }
  manageReviews() {
    this._bottomSheet.open(
      AnswerReviewsTableComponent
    )
  }
  manageProfile() {
    this._bottomSheet.open(
      UserProfileCardComponent
    )
  }

  overalls = [
    {
      title: "Questions",
      img: "assets/img/questionmarket/Creative_process_SVG.svg",
      content: 0,
      action_name: "Manage",
      action: () => {this.manageQuestions()}
    },{
      title: "Answers",
      img: "assets/img/questionmarket/Business_SVG.svg",
      content: 0,
      action_name: "Manage",
      action: () => {this.manageAnswers()}
    },{
      title: "Reviews",
      img: "assets/img/questionmarket/Search_SVG.svg",
      content: 0,
      action_name: "Manage",
      action: () => {this.manageReviews()}
    },
    {
      title: "Profile",
      img: "assets/img/questionmarket/profile_svg.svg",
      content: `<img src="assets/img/questionmarket/icons8-settings.svg" width="30px" height="30px">`,
      action_name: "Manage",
      action: () => {this.manageProfile()}
    },
  ]

  constructor(
    private store: Store,
    private localService: QuestionMarketLocalService,
    private router: Router,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {

    combineLatest([
      this.localService.questionmarketinfo$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => !x || !x.questionmarketinfo.answer_reviews || !x.questionmarketinfo.userinfo
        )
      ),
      this.localService.allquestions$.pipe(
        takeUntil(this.destroy$),
        skipWhile(
          x => x.length == 0
        )
      )
    ]).subscribe(
      x => {
        let info = x[0]!.questionmarketinfo
        if (!localStorage.getItem('user_id')) {
          return
        }
        let user_ID = parseInt(localStorage.getItem('user_id')!)

        this.questions = x[1].filter(
          y => y.post_author == user_ID && y.post_status == "publish"
        )
        this.overalls[0].content = this.questions.length
        this.overalls[1].content = info.userinfo?.user_private_answers!.length!
        this.reviews = info.answer_reviews!.filter(
          y => y.answerer_ID == user_ID
        )
        this.overalls[2].content = this.reviews.length

      }
    )

  }
  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

}
