import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerReviewIsReportedComponent } from './user-answer-review-is-reported.component';

describe('UserAnswerReviewIsReportedComponent', () => {
  let component: UserAnswerReviewIsReportedComponent;
  let fixture: ComponentFixture<UserAnswerReviewIsReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnswerReviewIsReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnswerReviewIsReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
