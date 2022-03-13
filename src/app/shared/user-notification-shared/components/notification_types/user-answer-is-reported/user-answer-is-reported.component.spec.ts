import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnswerIsReportedComponent } from './user-answer-is-reported.component';

describe('UserAnswerIsReportedComponent', () => {
  let component: UserAnswerIsReportedComponent;
  let fixture: ComponentFixture<UserAnswerIsReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnswerIsReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAnswerIsReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
