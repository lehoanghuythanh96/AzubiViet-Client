import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAnswerDialogComponent } from './report-answer-dialog.component';

describe('ReportAnswerDialogComponent', () => {
  let component: ReportAnswerDialogComponent;
  let fixture: ComponentFixture<ReportAnswerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAnswerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
