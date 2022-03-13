import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationAPIService {

  constructor(
    private apollo: Apollo
  ) { }

  getusernotificationapi: Observable<any> = this.apollo.watchQuery({
    query: gql`
    { 
      user_notifications {
        ID,
        type,
        data,
        secret
      }
    }
      `
  }).valueChanges;

}
