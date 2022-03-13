import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemSingleCardComponent } from './shop-item-single-card.component';

describe('ShopItemSingleCardComponent', () => {
  let component: ShopItemSingleCardComponent;
  let fixture: ComponentFixture<ShopItemSingleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopItemSingleCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopItemSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
