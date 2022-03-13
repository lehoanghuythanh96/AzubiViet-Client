import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerReviewsTableComponent } from './answer-reviews-table.component';

describe('AnswerReviewsTableComponent', () => {
  let component: AnswerReviewsTableComponent;
  let fixture: ComponentFixture<AnswerReviewsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerReviewsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerReviewsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
