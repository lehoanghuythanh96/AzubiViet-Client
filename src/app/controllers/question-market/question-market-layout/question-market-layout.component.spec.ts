import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMarketLayoutComponent } from './question-market-layout.component';

describe('QuestionMarketLayoutComponent', () => {
  let component: QuestionMarketLayoutComponent;
  let fixture: ComponentFixture<QuestionMarketLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMarketLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMarketLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
