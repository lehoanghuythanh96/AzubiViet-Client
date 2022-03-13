import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewIsLikedComponent } from './user-review-is-liked.component';

describe('UserReviewIsLikedComponent', () => {
  let component: UserReviewIsLikedComponent;
  let fixture: ComponentFixture<UserReviewIsLikedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReviewIsLikedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReviewIsLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
