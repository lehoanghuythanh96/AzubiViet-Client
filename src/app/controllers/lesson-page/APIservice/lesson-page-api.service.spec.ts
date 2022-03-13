import { TestBed } from '@angular/core/testing';

import { LessonPageAPIService } from './lesson-page-api.service';

describe('LessonPageAPIService', () => {
  let service: LessonPageAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonPageAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
