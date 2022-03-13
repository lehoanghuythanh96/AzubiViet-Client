import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdminInfoAction } from 'src/app/state/admininfo/admininfo.action';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { AdminAreaLocalService } from '../localservice/admin-area-local.service';

@Component({
  selector: 'app-admin-area-layout',
  templateUrl: './admin-area-layout.component.html',
  styleUrls: ['./admin-area-layout.component.scss']
})
export class AdminAreaLayoutComponent implements OnInit {

  constructor(
    private store: Store,
    private localService: AdminAreaLocalService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AdminInfoAction());
    this.store.select(AppSelector).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.localService.admininfo$.next(x.admininfo)
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
