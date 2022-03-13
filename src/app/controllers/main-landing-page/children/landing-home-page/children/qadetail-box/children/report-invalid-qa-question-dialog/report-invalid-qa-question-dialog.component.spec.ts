import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvalidQAQuestionDialogComponent } from './report-invalid-qa-question-dialog.component';

describe('ReportInvalidQAQuestionDialogComponent', () => {
  let component: ReportInvalidQAQuestionDialogComponent;
  let fixture: ComponentFixture<ReportInvalidQAQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvalidQAQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInvalidQAQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
