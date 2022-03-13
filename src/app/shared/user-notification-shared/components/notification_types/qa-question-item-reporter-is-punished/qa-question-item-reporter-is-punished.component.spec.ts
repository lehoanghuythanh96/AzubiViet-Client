import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAQuestionItemReporterIsPunishedComponent } from './qa-question-item-reporter-is-punished.component';

describe('QAQuestionItemReporterIsPunishedComponent', () => {
  let component: QAQuestionItemReporterIsPunishedComponent;
  let fixture: ComponentFixture<QAQuestionItemReporterIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAQuestionItemReporterIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAQuestionItemReporterIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
