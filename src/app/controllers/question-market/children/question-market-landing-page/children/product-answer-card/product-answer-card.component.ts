import { HttpParams, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { FileUploadFormPayload, FileUploadbyUrlPayload, postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { emitNames } from 'src/app/models/socketIO_emitNames/emitNames.entity';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UploadFileMediatorService } from 'src/app/shared/uploadfilemethods/upload-file-mediator.service';
import { QuestionmarketInfoAction } from 'src/app/state/questionmarketinfo/questionmarketinfo.action';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-answer-card',
  templateUrl: './product-answer-card.component.html',
  styleUrls: ['./product-answer-card.component.scss']
})
export class ProductAnswerCardComponent implements OnInit {

  answered = false;

  @Input()
  question_ID!: number;

  constructor(
    private _localService: QuestionMarketLocalService,
    private _UploadImg: UploadFileMediatorService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar,
    private socket: Socket,
    private store: Store
  ) { }

  answer_content = new FormControl('', [Validators.required])
  captchacheck = new FormControl('', [Validators.required])

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder;
  }

  recaptchaKey = environment.RECAPTCHA_SITE_KEY;
  resolvedCaptcha(e: any) {
    this.captchacheck.setValue(e)
  }

  user_answerimgs: string[] = [];

  get slideratio() {
    return this._localService.addquestionproduct.slideratio;
  }

  ngOnInit(): void {
    this._localService.allquestions$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        y => !y
      )
    ).subscribe(
      x => {
        let foundQuestion = x.find(
          y => y.ID == this.question_ID
        )

        if (foundQuestion && foundQuestion.questionmarket_user_answer) {
          let foundAnswer = foundQuestion.questionmarket_user_answer.find(
            y => y.user_ID == parseInt(localStorage.getItem('user_id')!)
          )
          if (foundAnswer) {
            this.answered = true
          }
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

  uploadimgbyfiletoggle = false;
  uploadimgbyfilesuccess = false;
  upimgformpercent = 0;
  uploadimgbyfileerror = false;
  uploadimgbyfileinfo: string = "";
  uploadimgbyurltoggle = false;
  uploadimgbyurlinfo = "";
  uploadimgbyurlerror = false;
  uploadimgbyurlsuccess = false;

  uploadfile(DOM: any) {
    if (this.user_answerimgs.length >= 10) {
      this._snackbar.open("You can only upload maximal 10 images", "Close")
      return
    }
    this.uploadimgbyfilesuccess = false;
    this.uploadimgbyfileerror = false;
    if (DOM.files.length == 1) {
      const _fileObjName = 'User_Answer_Image';
      let payload: FileUploadFormPayload = {
        upload_url_suffix: 'uploadquestionmarketuseranswerimgbyimgfile',
        inputfile: DOM.files[0],
        FileObjName: _fileObjName,
        param_variables: new HttpParams()
          .set('file_obj_name', _fileObjName)
          .set('file_size', parseInt(DOM.files[0].size))
      }
      this._UploadImg.uploadfile(payload).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.uploadimgbyfiletoggle = true;
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              var eventTotal = event.total ? event.total : 0;
              var Progress = Math.round(event.loaded / eventTotal * 100);
              this.upimgformpercent = Progress;
              console.log(`Uploaded ${Progress}%`);
              break;
            case HttpEventType.Response:
              this.uploadimgbyfilesuccess = true;
              this.uploadimgbyfiletoggle = false;
              this.user_answerimgs.push(event.body.newFilename)
              console.log('Image Uploaded Successfully!', event.body);
          };
        },
        (error) => {
          console.log('Image not Uploaded!');
          this.uploadimgbyfiletoggle = false;
          this.uploadimgbyfileerror = true;
          this.uploadimgbyfileinfo = error.error.message;
        }
      )
    } else {
      this.uploadimgbyfileinfo = 'This image is too large, maximal 25MB...';
    }
  }

  uploadfilebyurl(img_url: string) {
    if (this.user_answerimgs.length >= 10) {
      this._snackbar.open("You can only upload maximal 10 images", "Close")
      return
    }
    this.uploadimgbyurlsuccess = false;
    this.uploadimgbyurlerror = false;
    if (img_url !== '') {
      let _body = {
        img_url: img_url
      }
      let payload: FileUploadbyUrlPayload = {
        body: _body,
        upload_url_suffix: 'uploadquestionmarketuseranswerimgbyurl'
      }
      this._UploadImg.uploadfilebyurl(payload).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              this.uploadimgbyurltoggle = true;
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.Response:
              this.uploadimgbyurltoggle = false;
              console.log('Image Uploaded Successfully!', event.body);
              this.uploadimgbyurlsuccess = true;
              this.user_answerimgs.push(event.body.newFilename)
          };
        },
        (error) => {
          console.log('Image not Uploaded!');
          this.uploadimgbyurltoggle = false;
          this.uploadimgbyurlerror = true;
          this.uploadimgbyurlinfo = error.error.message;
        }
      )
    }
  }

  currentchoosedimg: any;

  deletetempproductimg() {

    if (this.currentchoosedimg) {
      let _body = {
        img_name: this.currentchoosedimg
      }

      let _payload: postAPI = {
        urlsuffix: 'deletetemporaryquestionuseranswerimg',
        body: _body
      }
      this._fetchAPI.postAPI(_payload).then(
        () => {
          let _index = this.user_answerimgs.indexOf(this.currentchoosedimg)
          this.user_answerimgs.splice(_index, 1)
          this.currentchoosedimg = undefined;
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )
    }

  }

  @ViewChild('imguploader')
  imguploader!: ElementRef<HTMLElement>

  productimgselected(name: string, target: string): void {
    let _imgs = this.imguploader.nativeElement.querySelectorAll('.useranswerimage')
    _imgs.forEach((img) => {
      img.classList.remove('border')
    })
    let _target = document.querySelector('#' + name)
    if (_target) {
      this.currentchoosedimg = target;
      _target!.classList.add('border', 'border-primary', 'border-4')
    } else {
      return;
    }
  }

  async confirmAnswer() {
    if (
      this.answer_content.valid &&
      this.captchacheck.valid
    ) {

      let _body = {
        answer_content: this.answer_content.value,
        answer_imgs: this.user_answerimgs,
        question_ID: this.question_ID
      }

      let _payload: postAPI = {
        urlsuffix: 'usersubmitquestionanswer',
        body: _body
      }

      await this._fetchAPI.postAPI(_payload).then(
        res => {
          if (res && res.length > 0) {
            if (typeof res[0] == 'number') {
              this.socket.emit(emitNames.requireUserReloadNotis.name, {
                userIDarr: res
              })
            }
          }
          this._snackbar.open("Your answer is submitted successfully","Close")
          this.store.dispatch(QuestionmarketInfoAction())
        }
      ).catch(
        (error: HttpErrorResponse) => {
          console.log(error.error)
          this._snackbar.open(error.error.message, "Close")
        }
      )

    } else {
      this._snackbar.open("Please fill out all required fields before submitting...", "Close")
    }

  }

  get modules() {
    return this._localService.quillModule
  }

}
