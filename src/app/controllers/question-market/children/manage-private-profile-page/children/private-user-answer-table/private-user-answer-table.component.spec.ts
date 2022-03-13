import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateUserAnswerTableComponent } from './private-user-answer-table.component';

describe('PrivateUserAnswerTableComponent', () => {
  let component: PrivateUserAnswerTableComponent;
  let fixture: ComponentFixture<PrivateUserAnswerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateUserAnswerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateUserAnswerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
