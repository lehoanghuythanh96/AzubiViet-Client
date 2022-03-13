import { TestBed } from '@angular/core/testing';

import { UserNotificationLocalService } from './user-notification-local.service';

describe('UserNotificationLocalService', () => {
  let service: UserNotificationLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNotificationLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
