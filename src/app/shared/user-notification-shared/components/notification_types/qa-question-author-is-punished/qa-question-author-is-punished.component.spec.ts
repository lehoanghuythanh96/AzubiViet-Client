import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAQuestionAuthorIsPunishedComponent } from './qa-question-author-is-punished.component';

describe('QAQuestionAuthorIsPunishedComponent', () => {
  let component: QAQuestionAuthorIsPunishedComponent;
  let fixture: ComponentFixture<QAQuestionAuthorIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAQuestionAuthorIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAQuestionAuthorIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
