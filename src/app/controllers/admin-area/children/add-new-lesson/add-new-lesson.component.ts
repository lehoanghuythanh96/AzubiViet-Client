import { Component, OnInit } from '@angular/core';
import { FileUploadbyUrlPayload, FileUploadFormPayload, postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { UploadFileMediatorService } from 'src/app/shared/uploadfilemethods/upload-file-mediator.service';
import { environment } from 'src/environments/environment';

import Quill from 'quill';
import { ImageHandler, Options } from 'ngx-quill-upload';
import { HttpErrorResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentChange } from 'ngx-quill';
import { AdminAreaLocalService } from '../../localservice/admin-area-local.service';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { skipWhile, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AdminInfoAction } from 'src/app/state/admininfo/admininfo.action';
import { AppSelector } from 'src/app/state/core/AppCoreReducer';
import { AdminInfo } from 'src/app/models/admininfo/admininfo.interface';

Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-add-new-lesson',
  templateUrl: './add-new-lesson.component.html',
  styleUrls: ['./add-new-lesson.component.scss']
})
export class AddNewLessonComponent implements OnInit {

  publishloading = false;

  cdnfolder: any;
  default_avatar: any;

  lessonForm = new FormGroup({
    post_title: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    post_content: new FormControl('', [Validators.required]),
    post_avatar: new FormControl('', [Validators.required])
  })

  postimgs: Array<any> = [];

  get neworedit() {
    return this._localService.addlesson.neworedit;
  }

  get editID() {
    return this._localService.addlesson.editID;
  }

  ngOnInit(): void {

    this._localService.admininfo$.pipe(
      takeUntil(this.destroy$),
      skipWhile(
        x => !x?.admininfo
      )
    ).subscribe(
      x => {
        let _admininfo: AdminInfo = x!.admininfo
        this.cdnfolder = environment.BASE_CDN_URL + '/' + _admininfo.defaultconfig?.postimg_path
        this.default_avatar = _admininfo.defaultconfig?.default_post_avatar
      }
    )

    this._localService.editlesson$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      x => {
        this.lessonForm.controls.post_title.setValue(x.post_title)
        this.lessonForm.controls.post_content.setValue(x.post_content)
        if (x.post_avatar != this.default_avatar) {
          this.lessonForm.controls.post_avatar.setValue(x.post_avatar)
        } else {
          this.lessonForm.controls.post_avatar.setValue('')
        }
      }
    )
  }

  _newLesson() {
    let _newLesson: newLessonBody = {
      post_title: '',
      post_content: '',
      post_category: [],
      post_imgarr: [],
      post_avatar: ''
    }
    this._localService.addlesson.neworedit = true;
    this._localService.editlesson$.next(_newLesson)
  }

  destroy$ = new Subject<boolean>();
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(false);
    this.destroy$.unsubscribe();
  }

  publish() {
    this.scaneditorimg();
    if (
      this._localService.addlesson.area_ID &&
      this._localService.addlesson.cat_ID &&
      this.lessonForm.valid
    ) {
      if (this._localService.addlesson.neworedit == true) {
        let _body: newLessonBody = {
          post_title: this.lessonForm.value.post_title,
          post_content: this.lessonForm.value.post_content,
          post_category: this._localService.addlesson.cat_ID,
          post_imgarr: this.postimgs,
          post_avatar: this.lessonForm.value.post_avatar
        }
        let _payload: postAPI = {
          urlsuffix: 'publishnewlesson',
          body: _body
        }
        this.publishloading = true;
        this._APIservice.postAPI(_payload).then(
          (value: any) => {
            this.publishloading = false;
            this.store.dispatch(AdminInfoAction())
            this._newLesson();
            this._snackbar.open('Published successfully!', "Close")
          }
        ).catch(
          (error: HttpErrorResponse) => {
            this.publishloading = false;
            console.log(error.error);
            this._snackbar.open(error.error.message, "Close")
          }
        )
      } else {
        let _body: editLessonBody = {
          post_title: this.lessonForm.value.post_title,
          post_content: this.lessonForm.value.post_content,
          post_category: this._localService.addlesson.cat_ID,
          post_imgarr: this.postimgs,
          ID: this.editID,
          post_avatar: this.lessonForm.value.post_avatar
        }
        let _payload: postAPI = {
          urlsuffix: 'editsinglelesson',
          body: _body
        }
        this.publishloading = true;
        this._APIservice.postAPI(_payload).then(
          (value: any) => {
            this.publishloading = false;
            this.store.dispatch(AdminInfoAction())
            this._newLesson();
            this._snackbar.open('Updated successfully!', "Close")
          }
        ).catch(
          (error: HttpErrorResponse) => {
            this.publishloading = false;
            console.log(error.error);
            this._snackbar.open(error.error.message, "Close")
          }
        )
      }
    } else {
      this._snackbar.open("Please fill out all the content first...", "Close")
    }
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

      ['link', 'image', 'video']                         // link and image, video
    ],
    imageHandler: {
      upload: (file: any) => {
        return new Promise((resolve, reject) => {

          if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') { // File types supported for image
            if (file.size < 10000000) { // Customize file size as per requirement
              const _fileObjName = 'lesson_image';
              let _payload: FileUploadFormPayload = {
                inputfile: file,
                upload_url_suffix: 'uploadlessonimage',
                FileObjName: _fileObjName,
                param_variables: new HttpParams()
                  .set('file_obj_name', _fileObjName)
                  .set('file_size', parseInt(file.size))
              }
              this._UploadImg.uploadfile(
                _payload
              ).subscribe(
                (event: HttpEvent<any>) => {
                  switch (event.type) {
                    case HttpEventType.Sent:
                      console.log('Request has been made!');
                      break;
                    case HttpEventType.ResponseHeader:
                      console.log('Response header has been received!');
                      break;
                    case HttpEventType.UploadProgress:
                      var eventTotal = event.total ? event.total : 0;
                      var Progress = Math.round(event.loaded / eventTotal * 100);
                      console.log(`Uploaded ${Progress}%`);
                      break;
                    case HttpEventType.Response:
                      console.log('Image Uploaded Successfully!', event.body);
                      resolve(environment.BASE_API_URL + '/' + event.body.newFilepath);
                  };
                },
                (error: HttpErrorResponse) => {
                  console.log('Image not Uploaded!', error.error);
                  this._snackbar.open(error.error.message, "Close");
                  reject(error.message);
                }
              )
            } else {
              reject('Size too large');
              // Handle Image size large logic 
            }
          } else {
            reject('Unsupported type');
            // Handle Unsupported type logic
          }
        });
      },
      accepts: ['png', 'jpg', 'jpeg', 'jfif'] // Extensions to allow for images (Optional) | Default - ['jpg', 'jpeg', 'png']
    } as Options

  };

  private scaneditorimg() {
    this.postimgs = [];
    var el = document.createElement('html');
    el.innerHTML = this.lessonForm.value.post_content;
    var _imgarr = el.querySelectorAll('img');
    for (var i = 0; i < _imgarr.length; i++) {
      let _link: string = _imgarr[i].getAttribute("src")!;
      const _imgorigin: string = _link.split('//')[1].split('/')[0];
      const _serverorigin = environment.BASE_CDN_URL.split('//')[1];
      let isOrigin: boolean;
      if (_imgorigin == _serverorigin) {
        isOrigin = true;
      } else {
        isOrigin = false;
      }
      var filename = _link.substring(_link.lastIndexOf('/') + 1);
      this.postimgs.push({
        name: filename,
        link: _link,
        isOrigin: isOrigin
      });
    }
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

  constructor(
    private _UploadImg: UploadFileMediatorService,
    private _snackbar: MatSnackBar,
    private _localService: AdminAreaLocalService,
    private _APIservice: FetchApiMethodsService,
    private store: Store
  ) { }

  uploadfile(DOM: any) {
    this.lessonForm.controls.post_avatar.setValue('');
    this.uploadimgbyfilesuccess = false;
    this.uploadimgbyfileerror = false;
    if (DOM.files.length == 1) {
      const _fileObjName = 'Post_Avatar';
      let payload: FileUploadFormPayload = {
        upload_url_suffix: 'uploadlessonavatarbyimgfile',
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
              this.lessonForm.controls.post_avatar.setValue(event.body.newFilename)
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
    this.uploadimgbyurlsuccess = false;
    this.uploadimgbyurlerror = false;
    if (img_url !== '') {
      this.lessonForm.controls.post_avatar.setValue('');
      let _body = {
        img_url: img_url
      }
      let payload: FileUploadbyUrlPayload = {
        body: _body,
        upload_url_suffix: 'uploadlessonavatarbyurl'
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
              this.lessonForm.controls.post_avatar.setValue(event.body.newFilename)
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


}

export interface newLessonBody {
  post_title: string,
  post_content: string,
  post_category: Array<number>,
  post_imgarr: Array<string>,
  post_avatar: string
}

export interface editLessonBody extends newLessonBody {
  ID: number;
}