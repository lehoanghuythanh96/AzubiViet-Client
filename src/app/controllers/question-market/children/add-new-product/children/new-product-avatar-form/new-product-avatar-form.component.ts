import { HttpParams, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { FileUploadFormPayload, FileUploadbyUrlPayload, postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UploadFileMediatorService } from 'src/app/shared/uploadfilemethods/upload-file-mediator.service';

@Component({
  selector: 'app-new-product-avatar-form',
  templateUrl: './new-product-avatar-form.component.html',
  styleUrls: ['./new-product-avatar-form.component.scss']
})
export class NewProductAvatarFormComponent implements OnInit {

  constructor(
    private _localService: QuestionMarketLocalService,
    private _UploadImg: UploadFileMediatorService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder;
  }

  get productavatar() {
    return this._localService.addquestionproduct.product_avatar;
  }

  get slideratio() {
    return this._localService.addquestionproduct.slideratio;
  }

  ngOnInit(): void {
    this._localService.addquestionproduct.product_avatar = "";
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

  async uploadfile(DOM: any) {
    this.uploadimgbyfilesuccess = false;
    this.uploadimgbyfileerror = false;
    if (DOM.files.length == 1) {
      if (this.currentchoosedimg) {
        await this.deletetempproductimg()
      }
      const _fileObjName = 'Product_Avatar';
      let payload: FileUploadFormPayload = {
        upload_url_suffix: 'uploadquestionproductavatarbyimgfile',
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
              this._localService.addquestionproduct.product_avatar = event.body.newFilename
              this.currentchoosedimg = event.body.newFilename
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

  async uploadfilebyurl(img_url: string) {
    this.uploadimgbyurlsuccess = false;
    this.uploadimgbyurlerror = false;
    if (img_url !== '') {

      if (this.currentchoosedimg) {
        await this.deletetempproductimg()
      }

      let _body = {
        img_url: img_url
      }
      let payload: FileUploadbyUrlPayload = {
        body: _body,
        upload_url_suffix: 'uploadquestionproductavatarbyurl'
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
              this._localService.addquestionproduct.product_avatar = event.body.newFilename
              this.currentchoosedimg = event.body.newFilename
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

  deletetempproductimg = () => new Promise (
    (resolve, reject) => {

      if (this.currentchoosedimg) {
        let _body = {
          img_name: this.currentchoosedimg
        }

        let _payload: postAPI = {
          urlsuffix: 'deletetemporaryquestionproductimg',
          body: _body
        }
        this._fetchAPI.postAPI(_payload).then(
          () => {
            this._localService.addquestionproduct.product_avatar = ""
            this.currentchoosedimg = undefined;
            resolve(true)
          }
        ).catch(
          (error: HttpErrorResponse) => {
            console.log(error.error)
            this._snackbar.open(error.error.message, "Close")
            reject(false)
          }
        )
      }

    }
  )

}
