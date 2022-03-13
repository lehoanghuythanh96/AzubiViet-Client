import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerReviewPageComponent } from './answer-review-page.component';

describe('AnswerReviewPageComponent', () => {
  let component: AnswerReviewPageComponent;
  let fixture: ComponentFixture<AnswerReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerReviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
