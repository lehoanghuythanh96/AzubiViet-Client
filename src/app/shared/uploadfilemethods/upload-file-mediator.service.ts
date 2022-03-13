import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadbyUrlPayload, FileUploadFormPayload } from 'src/app/models/httpAPI/httpAPI.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileMediatorService {

  constructor(
    private http: HttpClient
  ) { }

  uploadfile(payload: FileUploadFormPayload): Observable<any> {
    const file: File = payload.inputfile;
    const formData = new FormData();
    let _params = new HttpParams();
    if (payload.param_variables) {
      _params = payload.param_variables
    }
    formData.append(payload.FileObjName, file);
    return this.http.post(
      environment.BASE_API_URL + "/" + payload.upload_url_suffix,
      formData,
      {
        params: _params,
        reportProgress: true,
        observe: 'events'
      }
    )
  }

  uploadfilebyurl(payload: FileUploadbyUrlPayload) {
    let _params = new HttpParams();
    if (payload.param_variables) {
      _params = payload.param_variables
    }
    let _body = payload.body;
    return this.http.post(
      environment.BASE_API_URL + "/" + payload.upload_url_suffix,
      _body,
      {
        params: _params,
        reportProgress: true,
        observe: 'events'
      }
    );
  }
}
