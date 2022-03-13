import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingNavigationComponent } from './shopping-navigation.component';

describe('ShoppingNavigationComponent', () => {
  let component: ShoppingNavigationComponent;
  let fixture: ComponentFixture<ShoppingNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
