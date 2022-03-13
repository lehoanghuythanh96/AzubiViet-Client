import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { PostEntity } from 'src/app/models/postentity/post.entity';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  questionlist!: PostEntity[];

  constructor(
    private store: Store,
    private _localService: QuestionMarketLocalService
  ) { }

  ngOnInit(): void {

    this._localService.allquestions$.pipe(takeUntil(this.destroy$)).subscribe(
      x => {
        this.questionlist = x.filter(
          y => y.post_status == "publish"
        )
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
