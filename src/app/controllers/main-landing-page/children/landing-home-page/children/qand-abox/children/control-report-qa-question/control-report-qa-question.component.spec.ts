import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlReportQAQuestionComponent } from './control-report-qa-question.component';

describe('ControlReportQAQuestionComponent', () => {
  let component: ControlReportQAQuestionComponent;
  let fixture: ComponentFixture<ControlReportQAQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlReportQAQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlReportQAQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
