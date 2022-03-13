import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemShopPageComponent } from './item-shop-page.component';

describe('ItemShopPageComponent', () => {
  let component: ItemShopPageComponent;
  let fixture: ComponentFixture<ItemShopPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemShopPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemShopPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
