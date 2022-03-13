import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseranswerReviewerIsPunishedComponent } from './useranswer-reviewer-is-punished.component';

describe('UseranswerReviewerIsPunishedComponent', () => {
  let component: UseranswerReviewerIsPunishedComponent;
  let fixture: ComponentFixture<UseranswerReviewerIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseranswerReviewerIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseranswerReviewerIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
