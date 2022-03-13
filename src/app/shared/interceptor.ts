import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(requestToHandle: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Getting token form local storage
        let Authorization: string = localStorage.getItem('Authorization') || '';

        // Create headers and set token header
        const headers: HttpHeaders = new HttpHeaders().set('Authorization', Authorization);

        // Clone our request with the new headers because HttpRequests are immutable
        const authReq = requestToHandle.clone({ headers });

        // Last step is to return an Observable that will send the request or pass the request to the next interceptor if any
        return next.handle(authReq);
        
    }
}