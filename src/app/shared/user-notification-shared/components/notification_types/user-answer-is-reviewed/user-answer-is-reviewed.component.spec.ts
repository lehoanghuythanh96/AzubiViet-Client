import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerIsReviewedComponent } from './user-answer-is-reviewed.component';

describe('UserAnswerIsReviewedComponent', () => {
  let component: UserAnswerIsReviewedComponent;
  let fixture: ComponentFixture<UserAnswerIsReviewedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnswerIsReviewedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnswerIsReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
