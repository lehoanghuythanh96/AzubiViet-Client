import { TestBed } from '@angular/core/testing';

import { AdminAreaAPIService } from './admin-area-api.service';

describe('AdminAreaAPIService', () => {
  let service: AdminAreaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAreaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
