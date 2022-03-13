import { TestBed } from '@angular/core/testing';

import { QuestionMarketLocalService } from './question-market-local.service';

describe('QuestionMarketLocalService', () => {
  let service: QuestionMarketLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionMarketLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
