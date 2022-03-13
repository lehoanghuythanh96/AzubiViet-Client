import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatListItem, MatListModule, MatListOption, MatListOptionCheckboxPosition, MatNavList, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, skipWhile, map } from 'rxjs/operators';
import { AdminAreaLocalService } from 'src/app/controllers/admin-area/localservice/admin-area-local.service';
import { AppSelector, AppDataGeneralState } from 'src/app/state/core/AppCoreReducer';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';

@Component({
  selector: 'app-add-lesson-category-selector',
  templateUrl: './add-lesson-category-selector.component.html',
  styleUrls: ['./add-lesson-category-selector.component.scss']
})
export class AddLessonCategorySelectorComponent implements OnInit {

  catlist: any;
  catlist$: any;

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '250px'
    });
  }

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
        this.catlist = result!.admininfo.lessoncatlist;
        this.catlist$ = this.catlist.filter((y: any) => y.area_ID == this._localService.addlesson.area_ID)
      }
    )

    this._localService._lessonarea$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.catlist$ = this.catlist.filter((y: any) => y.area_ID == x)
        this._localService.addlesson.cat_ID = []
      }
    )

    this._localService.editlesson$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.matlist.selectedOptions.clear();
        this._localService.addlesson.cat_ID = [];
      }
    )

    this._localService.addlesson.cat_ID = [];
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  @ViewChild('list')
  matlist!: MatSelectionList;

  choosecat(value: MatListOption[]) {
    this._localService.addlesson.cat_ID = value.map(x => x.value);
  }

}
