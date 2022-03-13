import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInventoryCardComponent } from './user-inventory-card.component';

describe('UserInventoryCardComponent', () => {
  let component: UserInventoryCardComponent;
  let fixture: ComponentFixture<UserInventoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInventoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInventoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
