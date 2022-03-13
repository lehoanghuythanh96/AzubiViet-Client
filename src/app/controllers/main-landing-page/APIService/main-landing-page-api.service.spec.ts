import { TestBed } from '@angular/core/testing';

import { MainLandingPageAPIService } from './main-landing-page-api.service';

describe('MainLandingPageAPIService', () => {
  let service: MainLandingPageAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainLandingPageAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
