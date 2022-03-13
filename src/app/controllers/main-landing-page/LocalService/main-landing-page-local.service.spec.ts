import { TestBed } from '@angular/core/testing';

import { MainLandingPageLocalService } from './main-landing-page-local.service';

describe('MainLandingPageLocalService', () => {
  let service: MainLandingPageLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainLandingPageLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
