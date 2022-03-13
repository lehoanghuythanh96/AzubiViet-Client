import { TestBed } from '@angular/core/testing';

import { UserAuthenticationSharedLocalService } from './user-authentication-shared-local.service';

describe('UserAuthenticationSharedLocalService', () => {
  let service: UserAuthenticationSharedLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticationSharedLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
