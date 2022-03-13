import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAQuestionItemIsReportedComponent } from './qa-question-item-is-reported.component';

describe('QAQuestionItemIsReportedComponent', () => {
  let component: QAQuestionItemIsReportedComponent;
  let fixture: ComponentFixture<QAQuestionItemIsReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAQuestionItemIsReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAQuestionItemIsReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
