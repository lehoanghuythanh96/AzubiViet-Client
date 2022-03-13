import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, skipWhile, takeUntil } from 'rxjs/operators';
import { AdminAreaLocalService } from 'src/app/controllers/admin-area/localservice/admin-area-local.service';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { PostEntity } from 'src/app/models/postentity/post.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { AdminInfoAction } from 'src/app/state/admininfo/admininfo.action';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-post-table',
  templateUrl: './manage-post-table.component.html',
  styleUrls: ['./manage-post-table.component.scss']
})
export class ManagePostTableComponent implements OnInit {

  constructor(
    private store: Store,
    private _localsService: AdminAreaLocalService,
    private _APIservice: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource<PostEntity>([]);

  _subDatasource: Array<any> = [];

  ngOnInit(): void {

    this._localsService.admininfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(x => !x),
      map(x => x!.admininfo.lessons)
    ).subscribe(
      async x => {
        let sortArr = (a: any, b: any) => {
          return b.ID - a.ID;
        }
        let _x = [...x];
        this.dataSource.data = _x.sort(sortArr);
        this._subDatasource = x;
        setTimeout(
          () => this.dataSource.paginator = this.paginator, 500
        )
      }
    )
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editlesson(ID: number) {
    this._localsService.addlesson.neworedit = false;
    this._localsService.addlesson.editID = ID;
    let _lesson: PostEntity = this._subDatasource.filter((x: any) => x.ID === ID)[0];
    let _el = new DOMParser().parseFromString(_lesson.post_content, "text/html");
    var _imgarr = _el.querySelectorAll('img');

    let lessonctn = _lesson.post_content;
    for (var i = 0; i < _imgarr.length; i++) {
      let _begin: string = <any>_imgarr[i].getAttribute('src');
      let _end = environment.BASE_CDN_URL + '/' + _begin;
      lessonctn = lessonctn.replace(_begin, _end);
    }
    this._localsService.editlesson$.next({
      post_title: _lesson.post_title,
      post_content: lessonctn,
      post_category: _lesson.post_category,
      post_imgarr: [],
      post_avatar: _lesson.lesson_avatar.media_name
    })
  }

  deletelesson(post_ID: number) {

    if (confirm("Are you sure you want to delete this?")) {
      let _body = {
        post_ID: post_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'deletesinglelesson',
        body: _body
      }

      this._APIservice.postAPI(_payload).then(
        result => {
          console.log(result)
          this.store.dispatch(AdminInfoAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )
    }
  }

}
