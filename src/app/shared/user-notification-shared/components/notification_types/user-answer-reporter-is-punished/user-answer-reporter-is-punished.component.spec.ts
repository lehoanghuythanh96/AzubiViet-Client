import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerReporterIsPunishedComponent } from './user-answer-reporter-is-punished.component';

describe('UserAnswerReporterIsPunishedComponent', () => {
  let component: UserAnswerReporterIsPunishedComponent;
  let fixture: ComponentFixture<UserAnswerReporterIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnswerReporterIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnswerReporterIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
