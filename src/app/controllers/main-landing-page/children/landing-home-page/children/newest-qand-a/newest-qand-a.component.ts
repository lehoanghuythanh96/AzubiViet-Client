import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { MainLandingPageLocalService } from 'src/app/controllers/main-landing-page/LocalService/main-landing-page-local.service';
import { GuestQandAEntity } from 'src/app/models/guestQandA/guestQandA.entity';
import { UserEntity } from 'src/app/models/userentity/userinfo.entity';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { QADetailBoxComponent } from '../qadetail-box/qadetail-box.component';

@Component({
  selector: 'app-newest-qand-a',
  templateUrl: './newest-qand-a.component.html',
  styleUrls: ['./newest-qand-a.component.scss']
})
export class NewestQAndAComponent implements OnInit {

  userinfo!: UserEntity;

  dataSource = new MatTableDataSource<GuestQandAEntity>([]);
  displayedColumns: string[] = ['content', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private localService: MainLandingPageLocalService
  ) { }

  ngOnInit(): void {

    this.localService.mainlandingpageInfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        y => !y || !y.mainlandingpageInfo
      )
    ).subscribe(
      x => {
        if (x && x.mainlandingpageInfo && x.mainlandingpageInfo.all_QandA) {
          this.dataSource.data = x.mainlandingpageInfo.all_QandA!.filter(
            y => y.item_type == "question"
          )
          this.dataSource.paginator = this.paginator
        }
      }
    )

    this.localService.userinfo$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.userinfo = x!
      }
    )
  }

  openDialog(QA_ID: number) {
    const dialogRef = this.dialog.open(
      QADetailBoxComponent,
      {
        width: '400px',
        data: {
          QA_ID: QA_ID
        }
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

}
