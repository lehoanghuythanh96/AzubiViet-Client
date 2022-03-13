import { TestBed } from '@angular/core/testing';

import { QandALocalService } from './qand-a-local.service';

describe('QandALocalService', () => {
  let service: QandALocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QandALocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
