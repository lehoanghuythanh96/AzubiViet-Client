import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, skipWhile, takeUntil } from 'rxjs/operators';
import { AdminAreaLocalService } from 'src/app/controllers/admin-area/localservice/admin-area-local.service';
import { AppDataGeneralState, AppSelector } from 'src/app/state/core/AppCoreReducer';
import { NewAreaDialogComponent } from '../new-area-dialog/new-area-dialog.component';

@Component({
  selector: 'app-add-lesson-area-selector',
  templateUrl: './add-lesson-area-selector.component.html',
  styleUrls: ['./add-lesson-area-selector.component.scss']
})
export class AddLessonAreaSelectorComponent implements OnInit {

  openAddAreaDialog(): void {
    const dialogRef = this.dialog.open(NewAreaDialogComponent, {
      width: '250px'
    });
  }

  arealist: any;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private _localService: AdminAreaLocalService
  ) { }

  ngOnInit(): void {
    this._localService.admininfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(x => !x?.admininfo)
    ).subscribe(
      result => {
        this.arealist = result!.admininfo.arealist;
      }
    )

    this._localService._lessonarea$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.areaselect.value = x
        this._localService.addlesson.area_ID = x
      }
    )

    this._localService.editlesson$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.areaselect.value = undefined;
        this.emitarea(null)
      }
    )

    this._localService.addlesson.area_ID = null;
  }

  @ViewChild('areaselect')
  areaselect!: MatSelect;

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  emitarea(value: number | null): void {
    this._localService.addlesson.area_ID = value;
    this._localService._lessonarea$.next(value)
  }

}
