import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAuthorIsPunishedComponent } from './question-author-is-punished.component';

describe('QuestionAuthorIsPunishedComponent', () => {
  let component: QuestionAuthorIsPunishedComponent;
  let fixture: ComponentFixture<QuestionAuthorIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAuthorIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAuthorIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
