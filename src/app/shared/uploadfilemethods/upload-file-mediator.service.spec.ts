import { TestBed } from '@angular/core/testing';

import { UploadFileMediatorService } from './upload-file-mediator.service';

describe('UploadFileMediatorService', () => {
  let service: UploadFileMediatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadFileMediatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
