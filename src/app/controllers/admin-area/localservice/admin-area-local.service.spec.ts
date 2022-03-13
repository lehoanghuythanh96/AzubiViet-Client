import { TestBed } from '@angular/core/testing';

import { AdminAreaLocalService } from './admin-area-local.service';

describe('AdminAreaLocalService', () => {
  let service: AdminAreaLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAreaLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
