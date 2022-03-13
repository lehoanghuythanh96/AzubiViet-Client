import { HttpErrorResponse, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { postAPI, FileUploadFormPayload, FileUploadbyUrlPayload } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UploadFileMediatorService } from 'src/app/shared/uploadfilemethods/upload-file-mediator.service';
import { QandALocalService } from '../../QALocalService/qand-a-local.service';

@Component({
  selector: 'app-qa-images-form',
  templateUrl: './qa-images-form.component.html',
  styleUrls: ['./qa-images-form.component.scss']
})
export class QAImagesFormComponent implements OnInit {

  @Input()
  cdnfolder?: string;

  constructor(
    private _localService: QandALocalService,
    private _UploadImg: UploadFileMediatorService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  QAimgselected(name: string, target: string): void {
    let _imgs = document.querySelectorAll('.qaimage')
    _imgs.forEach((img) => {
      img.classList.remove('border')
    })
    let _target = document.querySelector('#' + name)
    if (_target) {
      this.currentchoosedimg = target;
      _target!.classList.add('border','border-primary','border-4')
    } else { 
      return;
    }
  }

  slideratio = 3

  ngOnInit(): void {
    this._localService.QA_imgs = [];
  }

  get QA_imgs() {
    return this._localService.QA_imgs;
  }

  currentchoosedimg: any;

  deletetempQAimg() {

    if (this.currentchoosedimg) {
      let _body = {
        img_name: this.currentchoosedimg
      }
  
      let _payload: postAPI = {
        urlsuffix: 'deletetemporary_qanda_img',
        body: _body
      }
      this._fetchAPI.postAPI(_payload).then(
        () => {
          let _index = this._localService.QA_imgs.indexOf(this.currentchoosedimg)
          this._localService.QA_imgs.splice(_index, 1)
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
    if (this._localService.QA_imgs.length >= 10) {
      this._snackbar.open("You can only upload maximal 10 images","Close")
      return
    }
    this.uploadimgbyfilesuccess = false;
    this.uploadimgbyfileerror = false;
    if (DOM.files.length == 1) {
      const _fileObjName = 'QA_Image';
      let payload: FileUploadFormPayload = {
        upload_url_suffix: 'uploadqandaimgbyimgfile',
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
              this._localService.QA_imgs.push(event.body.newFilename)
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
    if (this._localService.QA_imgs.length >= 10) {
      this._snackbar.open("You can only upload maximal 10 images","Close")
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
        upload_url_suffix: 'uploadqandaimgbyurl'
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
              this._localService.QA_imgs.push(event.body.newFilename)
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
