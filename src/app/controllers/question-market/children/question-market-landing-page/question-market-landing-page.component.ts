import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { FormControl, Validators } from '@angular/forms';
import { QuestionMarketLocalService } from '../../LocalService/question-market-local.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-market-landing-page',
  templateUrl: './question-market-landing-page.component.html',
  styleUrls: ['./question-market-landing-page.component.scss']
})
export class QuestionMarketLandingPageComponent implements OnInit {

  areaselection = new FormControl(1, [Validators.required, Validators.pattern('^[0-9]'), Validators.min(1)])

  userinfo: any;
  arealist: any;

  constructor(
    private store: Store,
    private _localService: QuestionMarketLocalService,
    private router: Router,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._localService.questionmarketinfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x || !x.questionmarketinfo
      )
    ).subscribe(
      x => {
        const _info = x!.questionmarketinfo;
        this.userinfo = _info.userinfo;
        this.arealist = _info.product_tree;
      }
    )
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  emitareachoosed(value: number) {
    if (this.areaselection.valid) {
      this._localService.marketpplace.choosed_area = value;
      this.router.navigate(['/questionmarket/market'])
    } else {
      this._snackbar.open("Please first choose an area...","Close")
    }
  }

}
