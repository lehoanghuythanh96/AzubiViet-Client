import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvalidQAAnswerDialogComponent } from './report-invalid-qa-answer-dialog.component';

describe('ReportInvalidQAAnswerDialogComponent', () => {
  let component: ReportInvalidQAAnswerDialogComponent;
  let fixture: ComponentFixture<ReportInvalidQAAnswerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvalidQAAnswerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInvalidQAAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
