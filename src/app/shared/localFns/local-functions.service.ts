import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalFunctionsService {

  constructor() { }
  
}

export function removelocaldata() {
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_name');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_role');
  localStorage.removeItem('Authorization');
  localStorage.removeItem('access_token');
  localStorage.removeItem('user_current_server');
}