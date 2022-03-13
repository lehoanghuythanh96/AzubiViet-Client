import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { LessonCategoryEntity } from 'src/app/models/lessoncategoryentity/lessoncategory.entity';
import { AreaListEntity } from 'src/app/models/lessoninfo/lessoninfo.interface';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { environment } from 'src/environments/environment';
import { AddQuestionProduct, QuestionMarketLocalService } from '../../LocalService/question-market-local.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { AddNewQuestionProducPostBody, EditQuestionProducPostBody } from 'src/app/models/postentity/post.entity';
import { QuestionMarketAddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {

  questiontoedit!: number;
  answertoedit!: number;

  get addoredit() {
    return this._localService.addquestionproduct.addoredit
  }

  productForm = new FormGroup({
    area_ID: new FormControl(0, [Validators.required, Validators.min(1)]),
    category_ID: new FormControl(0, [Validators.required, Validators.min(1)]),
    question_title: new FormControl('', [Validators.required, Validators.maxLength(155)]),
    question_content: new FormControl('', [Validators.required]),
    question_answer: new FormControl('', [Validators.required])
  })

  arealist!: [AreaListEntity] | null;
  catlist?: LessonCategoryEntity[];

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private _localService: QuestionMarketLocalService,
    private breakpointobserver: BreakpointObserver,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.productForm.controls.area_ID.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        if (x > 0) {
          const _catlist = this.arealist?.filter(y => y.ID == x)[0].child_category_questionproduct;
          this.catlist = _catlist;
        } else {
          this.catlist = undefined;
          this.productForm.controls.category_ID.reset()
        }
        this._localService.addquestionproduct.area_ID = x;
      }
    )

    this._localService.questionmarketinfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(x => !x || !x.questionmarketinfo.product_tree),
    ).subscribe(
      selector => {
        let _x = selector!.questionmarketinfo;
        this.arealist = _x.product_tree
        this.productForm.controls.area_ID.reset()
      }
    )

    this._localService.choosed_editpost$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        if (x > 0) {
          let _post = this._localService.addquestionproduct.current_productlist?.filter(y => y.ID == x)[0]
          this.productForm.controls.question_title.setValue(_post?.post_title)
          this.productForm.controls.question_content.setValue(_post?.post_content)
          this.productForm.controls.question_answer.setValue(_post!.question_answer.answer_content)
          let _templocal: Partial<AddQuestionProduct> = {
            area_ID: null,
            productimgs: _post!.question_imgs.map(x => x.media_name),
            answer_imgs: _post!.question_answer.answer_imgs.map(x => x.media_name),
            product_avatar: _post!.question_avatar.media_name,
            addoredit: false
          };
          this.questiontoedit = x;
          this.answertoedit = _post!.question_answer.ID;
          this._localService.addquestionproduct = Object.assign(this._localService.addquestionproduct, _templocal);
        } else {
          this.resetform();
        }
      }
    )

    this.breakpointobserver.observe([
      Breakpoints.XSmall
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          if (Breakpoints.XSmall.includes(query)) {
            this._localService.addquestionproduct.slideratio = 3;
          } else {
            this._localService.addquestionproduct.slideratio = 5;
          }
        }
      }
    }
    )
  }

  openAddCategoryDialog() {
    const dialogRef = this.dialog.open(QuestionMarketAddCategoryDialogComponent, {
      width: '250px'
    });
    return dialogRef;
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  confirmForm() {
    if (this.productForm.valid) {
      if (confirm("Are you sure that you want to save this product?")) {
        if (this._localService.addquestionproduct.addoredit) {
          let _body: AddNewQuestionProducPostBody = {
            post_title: this.productForm.value.question_title,
            post_category: this.productForm.value.category_ID,
            post_content: this.productForm.value.question_content,
            answer_content: this.productForm.value.question_answer,
            questionimgs: this._localService.addquestionproduct.productimgs,
            answerimgs: this._localService.addquestionproduct.answer_imgs,
            question_avatar: this._localService.addquestionproduct.product_avatar
          }

          let _payload: postAPI = {
            urlsuffix: 'createnewquestionproduct',
            body: _body
          }

          this._fetchAPI.postAPI(_payload).then(
            response => {
              this.store.dispatch(QuestionmarketInfoAction());
              this.resetform();
              this._snackbar.open(
                "Published successfully",
                "Close"
              )
            }
          ).catch(
            (error: HttpErrorResponse) => {
              console.log(error.error)
              this._snackbar.open(error.error.message, "Close")
            }
          )
        } else {
          let _body: EditQuestionProducPostBody = {
            post_title: this.productForm.value.question_title,
            post_category: this.productForm.value.category_ID,
            post_content: this.productForm.value.question_content,
            answer_content: this.productForm.value.question_answer,
            questionimgs: this._localService.addquestionproduct.productimgs,
            answerimgs: this._localService.addquestionproduct.answer_imgs,
            question_avatar: this._localService.addquestionproduct.product_avatar,
            question_ID: this.questiontoedit,
            answer_ID: this.answertoedit
          }

          let _payload: postAPI = {
            urlsuffix: 'editprivatequestionproduct',
            body: _body
          }

          this._fetchAPI.postAPI(_payload).then(
            response => {
              this.store.dispatch(QuestionmarketInfoAction());
              this.resetform();
              this._snackbar.open(
                "Updated successfully",
                "Close"
              )
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
  }

  resetform() {
    let _templocal: Partial<AddQuestionProduct> = {
      area_ID: null,
      productimgs: [],
      answer_imgs: [],
      product_avatar: "",
      addoredit: true
    };
    this._localService.addquestionproduct = Object.assign(this._localService.addquestionproduct, _templocal);
    this.productForm.reset()
  }

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

    ]
  }

}
