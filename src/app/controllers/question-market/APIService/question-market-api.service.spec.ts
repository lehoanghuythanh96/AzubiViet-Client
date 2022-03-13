import { TestBed } from '@angular/core/testing';

import { QuestionMarketAPIService } from './question-market-api.service';

describe('QuestionMarketAPIService', () => {
  let service: QuestionMarketAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionMarketAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
