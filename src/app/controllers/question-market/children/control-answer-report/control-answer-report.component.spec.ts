import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAnswerReportComponent } from './control-answer-report.component';

describe('ControlAnswerReportComponent', () => {
  let component: ControlAnswerReportComponent;
  let fixture: ComponentFixture<ControlAnswerReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAnswerReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAnswerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
