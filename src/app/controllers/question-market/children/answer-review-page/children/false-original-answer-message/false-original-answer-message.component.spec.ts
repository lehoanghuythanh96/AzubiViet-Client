import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FalseOriginalAnswerMessageComponent } from './false-original-answer-message.component';

describe('FalseOriginalAnswerMessageComponent', () => {
  let component: FalseOriginalAnswerMessageComponent;
  let fixture: ComponentFixture<FalseOriginalAnswerMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FalseOriginalAnswerMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FalseOriginalAnswerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
