import { TestBed } from '@angular/core/testing';

import { FetchApiMethodsService } from './fetch-api-methods.service';

describe('FetchApiMethodsService', () => {
  let service: FetchApiMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApiMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
