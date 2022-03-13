import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAAnswerAuthorIsPunishedComponent } from './qa-answer-author-is-punished.component';

describe('QAAnswerAuthorIsPunishedComponent', () => {
  let component: QAAnswerAuthorIsPunishedComponent;
  let fixture: ComponentFixture<QAAnswerAuthorIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAAnswerAuthorIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAAnswerAuthorIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
