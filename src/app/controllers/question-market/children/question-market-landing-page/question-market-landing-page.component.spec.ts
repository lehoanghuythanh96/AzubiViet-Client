import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionMarketLandingPageComponent } from './question-market-landing-page.component';

describe('QuestionMarketLandingPageComponent', () => {
  let component: QuestionMarketLandingPageComponent;
  let fixture: ComponentFixture<QuestionMarketLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionMarketLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionMarketLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
