import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAnswerCardComponent } from './product-answer-card.component';

describe('ProductAnswerCardComponent', () => {
  let component: ProductAnswerCardComponent;
  let fixture: ComponentFixture<ProductAnswerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAnswerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
