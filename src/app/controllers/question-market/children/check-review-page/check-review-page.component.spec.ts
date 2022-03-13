import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckReviewPageComponent } from './check-review-page.component';

describe('CheckReviewPageComponent', () => {
  let component: CheckReviewPageComponent;
  let fixture: ComponentFixture<CheckReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckReviewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
