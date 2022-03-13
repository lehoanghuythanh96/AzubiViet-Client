import { TestBed } from '@angular/core/testing';

import { LocalFunctionsService } from './local-functions.service';

describe('LocalFunctionsService', () => {
  let service: LocalFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
