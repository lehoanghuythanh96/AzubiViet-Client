import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMarketReviewUserAnswerComponent } from './question-market-review-user-answer.component';

describe('QuestionMarketReviewUserAnswerComponent', () => {
  let component: QuestionMarketReviewUserAnswerComponent;
  let fixture: ComponentFixture<QuestionMarketReviewUserAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMarketReviewUserAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMarketReviewUserAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
