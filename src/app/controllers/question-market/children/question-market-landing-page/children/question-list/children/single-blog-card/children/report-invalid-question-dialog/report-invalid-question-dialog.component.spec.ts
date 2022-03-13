import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvalidQuestionDialogComponent } from './report-invalid-question-dialog.component';

describe('ReportInvalidQuestionDialogComponent', () => {
  let component: ReportInvalidQuestionDialogComponent;
  let fixture: ComponentFixture<ReportInvalidQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvalidQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInvalidQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
