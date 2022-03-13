import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAAnswerItemReporterIsPunishedComponent } from './qa-answer-item-reporter-is-punished.component';

describe('QAAnswerItemReporterIsPunishedComponent', () => {
  let component: QAAnswerItemReporterIsPunishedComponent;
  let fixture: ComponentFixture<QAAnswerItemReporterIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAAnswerItemReporterIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAAnswerItemReporterIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
