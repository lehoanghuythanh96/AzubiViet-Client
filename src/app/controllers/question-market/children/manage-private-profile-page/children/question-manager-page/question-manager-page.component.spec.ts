import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionManagerPageComponent } from './question-manager-page.component';

describe('QuestionManagerPageComponent', () => {
  let component: QuestionManagerPageComponent;
  let fixture: ComponentFixture<QuestionManagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionManagerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
