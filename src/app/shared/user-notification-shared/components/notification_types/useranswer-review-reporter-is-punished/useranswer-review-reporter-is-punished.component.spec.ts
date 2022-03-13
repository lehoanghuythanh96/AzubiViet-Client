import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseranswerReviewReporterIsPunishedComponent } from './useranswer-review-reporter-is-punished.component';

describe('UseranswerReviewReporterIsPunishedComponent', () => {
  let component: UseranswerReviewReporterIsPunishedComponent;
  let fixture: ComponentFixture<UseranswerReviewReporterIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseranswerReviewReporterIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseranswerReviewReporterIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
