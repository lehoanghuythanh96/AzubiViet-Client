import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnswerReviewDialogComponent } from './report-answer-review-dialog.component';

describe('ReportAnswerReviewDialogComponent', () => {
  let component: ReportAnswerReviewDialogComponent;
  let fixture: ComponentFixture<ReportAnswerReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAnswerReviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnswerReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
