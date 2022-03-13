import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlQuestionReportComponent } from './control-question-report.component';

describe('ControlQuestionReportComponent', () => {
  let component: ControlQuestionReportComponent;
  let fixture: ComponentFixture<ControlQuestionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlQuestionReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlQuestionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
