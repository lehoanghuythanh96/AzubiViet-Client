import { TestBed } from '@angular/core/testing';

import { LessonPageLocalService } from './lesson-page-local.service';

describe('LessonPageLocalService', () => {
  let service: LessonPageLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonPageLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
