import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryItemInfoCardComponent } from './inventory-item-info-card.component';

describe('InventoryItemInfoCardComponent', () => {
  let component: InventoryItemInfoCardComponent;
  let fixture: ComponentFixture<InventoryItemInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryItemInfoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryItemInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
