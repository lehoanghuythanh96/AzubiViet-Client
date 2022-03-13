import { TestBed } from '@angular/core/testing';

import { UserAuthenticationAPIService } from './user-authentication-api.service';

describe('UserAuthenticationAPIService', () => {
  let service: UserAuthenticationAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticationAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
