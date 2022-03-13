import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionProductIsReportedComponent } from './question-product-is-reported.component';

describe('QuestionProductIsReportedComponent', () => {
  let component: QuestionProductIsReportedComponent;
  let fixture: ComponentFixture<QuestionProductIsReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionProductIsReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionProductIsReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
