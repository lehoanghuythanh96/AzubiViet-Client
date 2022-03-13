import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInventoryItemComponent } from './single-inventory-item.component';

describe('SingleInventoryItemComponent', () => {
  let component: SingleInventoryItemComponent;
  let fixture: ComponentFixture<SingleInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleInventoryItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
