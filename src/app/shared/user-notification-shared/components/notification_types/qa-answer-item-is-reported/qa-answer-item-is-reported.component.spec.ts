import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAAnswerItemIsReportedComponent } from './qa-answer-item-is-reported.component';

describe('QAAnswerItemIsReportedComponent', () => {
  let component: QAAnswerItemIsReportedComponent;
  let fixture: ComponentFixture<QAAnswerItemIsReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAAnswerItemIsReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAAnswerItemIsReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
