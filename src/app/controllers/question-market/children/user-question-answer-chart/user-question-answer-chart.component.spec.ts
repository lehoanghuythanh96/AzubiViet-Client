import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuestionAnswerChartComponent } from './user-question-answer-chart.component';

describe('UserQuestionAnswerChartComponent', () => {
  let component: UserQuestionAnswerChartComponent;
  let fixture: ComponentFixture<UserQuestionAnswerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserQuestionAnswerChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuestionAnswerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
