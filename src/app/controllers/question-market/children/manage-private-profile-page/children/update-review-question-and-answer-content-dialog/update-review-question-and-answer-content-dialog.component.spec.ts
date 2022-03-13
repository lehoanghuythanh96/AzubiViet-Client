import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReviewQuestionAndAnswerContentDialogComponent } from './update-review-question-and-answer-content-dialog.component';

describe('UpdateReviewQuestionAndAnswerContentDialogComponent', () => {
  let component: UpdateReviewQuestionAndAnswerContentDialogComponent;
  let fixture: ComponentFixture<UpdateReviewQuestionAndAnswerContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReviewQuestionAndAnswerContentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReviewQuestionAndAnswerContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
