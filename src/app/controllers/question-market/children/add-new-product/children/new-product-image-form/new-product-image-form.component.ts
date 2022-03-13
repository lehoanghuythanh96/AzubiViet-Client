import { HttpParams, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionMarketLocalService } from 'src/app/controllers/question-market/LocalService/question-market-local.service';
import { FileUploadFormPayload, FileUploadbyUrlPayload, postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { FetchApiMethodsService } from 'src/app/shared/fetchapimethods/fetch-api-methods.service';
import { UploadFileMediatorService } from 'src/app/shared/uploadfilemethods/upload-file-mediator.service';

@Component({
  selector: 'app-new-product-image-form',
  templateUrl: './new-product-image-form.component.html',
  styleUrls: ['./new-product-image-form.component.scss']
})
export class NewProductImageFormComponent implements OnInit {

  constructor(
    private _localService: QuestionMarketLocalService,
    private _UploadImg: UploadFileMediatorService,
    private _fetchAPI: FetchApiMethodsService,
    private _snackbar: MatSnackBar
  ) { }

  productimgselected(name: string, target: string): void {
    let _imgs = document.querySelectorAll('.productimage')
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

  get slideratio() {
    return this._localService.addquestionproduct.slideratio;
  }

  get cdnfolder() {
    return this._localService.addquestionproduct.cdnfolder;
  }

  ngOnInit(): void {
    this._localService.addquestionproduct.productimgs = [];
  }

  get productimgs() {
    return this._localService.addquestionproduct.productimgs;
  }

  currentchoosedimg: any;

  deletetempproductimg() {

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
          let _index = this._localService.addquestionproduct.productimgs.indexOf(this.currentchoosedimg)
          this._localService.addquestionproduct.productimgs.splice(_index, 1)
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
    if (this._localService.addquestionproduct.productimgs.length >= 10) {
      this._snackbar.open("You can only upload maximal 10 images","Close")
      return
    }
    this.uploadimgbyfilesuccess = false;
    this.uploadimgbyfileerror = false;
    if (DOM.files.length == 1) {
      const _fileObjName = 'Product_Image';
      let payload: FileUploadFormPayload = {
        upload_url_suffix: 'uploadquestionproductimgbyimgfile',
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
              this._localService.addquestionproduct.productimgs.push(event.body.newFilename)
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
    if (this._localService.addquestionproduct.productimgs.length >= 10) {
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
        upload_url_suffix: 'uploadquestionproductimgbyurl'
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
              this._localService.addquestionproduct.productimgs.push(event.body.newFilename)
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
