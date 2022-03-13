import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAPI, postAPI } from 'src/app/models/httpAPI/httpAPI.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchApiMethodsService {

  constructor(
    private http: HttpClient
  ) { }

  getAPI(payload: getAPI) {
    return new Promise((resolve, reject) => {
      try {
        let _params = new HttpParams();
        if (payload.param_variables) {
          _params = payload.param_variables;
        }
        this.http.get(environment.BASE_API_URL + '/' + payload.urlsuffix, { params: _params, responseType: 'json' })
          .subscribe(
            (object: any) => {
              resolve(object);
            },
            (error: any) => {
              console.log(error);
              reject(error);
            }
          );
      } catch (error) {
        reject(error);
      }
    })
  }

  postAPI(payload: postAPI) {
    return new Promise<any>((resolve, reject) => {
      try {

        let _params = new HttpParams();
        if (payload.param_variables) {
          _params = payload.param_variables;
        }
        this
          .http
          .post(environment.BASE_API_URL + '/' + payload.urlsuffix, payload.body, { params: _params, responseType: 'json' })
          .subscribe(
            (object: Object) => {
              resolve(object);
            },
            (error) => {
              reject(error)
            }
          );
      } catch (error) {
        reject(error);
      }
    })
  }

}
