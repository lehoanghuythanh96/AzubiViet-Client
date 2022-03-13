import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';

@Component({
  selector: 'app-private-product-manager-table',
  templateUrl: './private-product-manager-table.component.html',
  styleUrls: ['./private-product-manager-table.component.scss']
})
export class PrivateProductManagerTableComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'post_title', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) _matsort!: MatSort;

  productlist$ = new Subject<Array<any>>();
  tableData: MatTableDataSource<Array<any>> = new MatTableDataSource<Array<any>>([]);

  constructor(
    private store: Store,
    private _localService: QuestionMarketLocalService,
    private fetchapimethods: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.tableData.paginator = this.paginator
    this.tableData.sort = this._matsort
  }

  ngOnInit(): void {

    this.productlist$.pipe(takeUntil(this.destroy$)).subscribe(
      x => {
        this.tableData.data = x
        this._localService.addquestionproduct.current_productlist = x
      }
    )

    this._localService.allquestions$.pipe(takeUntil(this.destroy$)).subscribe(
      x => {
        let _productlist = x.filter(y => y.post_author == parseInt(<string>localStorage.getItem('user_id')) && y.post_status == "publish")
        this.productlist$.next(_productlist)
      }
    )
  }

  deleteSingleQuestion(question_ID: number) {
    if (confirm("Are you sure you want to delete this question?")) {
      let _payload: postAPI = {
        urlsuffix: 'userdeletesinglequestionproduct',
        body: {
          question_ID
        }
      }

      this.fetchapimethods.postAPI(_payload).then(
        res => {
          this._snackbar.open("Deleted sucessfully", "Close")
          this.store.dispatch(QuestionmarketInfoAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )
    }

  }

  emiteditID(ID: number) {
    this._localService.choosed_editpost$.next(ID)
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
