import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil, skipWhile } from 'rxjs/operators';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { QuestionMarket_UserAnswerEntity } from 'src/app/models/questionmarketuseranswer/questionmarketuseranswer.entity';
import { UserAnswerReviewEntity } from 'src/app/models/userAnswerReview/useranswerreview.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';

@Component({
  selector: 'app-user-question-answer-chart',
  templateUrl: './user-question-answer-chart.component.html',
  styleUrls: ['./user-question-answer-chart.component.scss']
})
export class UserQuestionAnswerChartComponent implements OnInit {

  questions: PostEntity[] = []
  answers: QuestionMarket_UserAnswerEntity[] = []
  reviews: UserAnswerReviewEntity[] = []

  constructor(
    private store: Store,
    private localService: QuestionMarketLocalService
  ) { }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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
          y => y.post_author == user_ID
        )

        this.answers = info.userinfo?.user_private_answers!

        this.reviews = info.answer_reviews!.filter(
          y => y.answerer_ID == user_ID
        )

        this.resetChart();
        this.questions.forEach(
          item => {
            let today = new Date()
            let dt = new Date(item.post_date)
            if (dt.getFullYear() == today.getFullYear()) {
              let currval = <number>this.lineChartData.datasets[0].data[dt.getMonth()]
              this.lineChartData.datasets[0].data[dt.getMonth()] = currval + 1;
            }
          }
        )

        this.answers.forEach(
          item => {
            let today = new Date()
            let dt = new Date(item.answer_date)
            if (dt.getFullYear() == today.getFullYear()) {
              let currval = <number>this.lineChartData.datasets[0].data[dt.getMonth()]
              this.lineChartData.datasets[1].data[dt.getMonth()] = currval + 1;
            }
          }
        )

        this.reviews.forEach(
          item => {
            let today = new Date()
            let dt = new Date(item.review_date)
            if (dt.getFullYear() == today.getFullYear()) {
              let currval = <number>this.lineChartData.datasets[0].data[dt.getMonth()]
              this.lineChartData.datasets[2].data[dt.getMonth()] = currval + 1;
            }
          }
        )

        this.chart?.update()

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

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Your Questions',
        backgroundColor: 'rgb(158 113 245 / 20%)',
        borderColor: 'rgb(158 113 245)',
        pointBackgroundColor: 'rgb(158 113 245)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Your Answers',
        backgroundColor: 'rgb(113 147 245 / 20%)',
        borderColor: 'rgb(113 147 245)',
        pointBackgroundColor: 'rgb(113 147 245)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Reviews',
        backgroundColor: 'rgb(108 117 125 / 20%)',
        borderColor: 'rgb(108 117 125)',
        pointBackgroundColor: 'rgb(108 117 125)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {}
    },

    plugins: {
      legend: { display: true }
    }
  };

  public lineChartType: ChartType = 'line';

  resetChart() {
    this.lineChartData = {
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Your Questions',
          backgroundColor: 'rgb(158 113 245 / 20%)',
          borderColor: 'rgb(158 113 245)',
          pointBackgroundColor: 'rgb(158 113 245)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Your Answers',
          backgroundColor: 'rgb(113 147 245 / 20%)',
          borderColor: 'rgb(113 147 245)',
          pointBackgroundColor: 'rgb(113 147 245)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
          fill: 'origin',
        },
        {
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          label: 'Reviews',
          backgroundColor: 'rgb(108 117 125 / 20%)',
          borderColor: 'rgb(108 117 125)',
          pointBackgroundColor: 'rgb(108 117 125)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        }
      ],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    };
  }

}