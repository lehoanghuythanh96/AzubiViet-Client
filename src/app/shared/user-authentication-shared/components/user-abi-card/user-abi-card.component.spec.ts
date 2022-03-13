import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAbiCardComponent } from './user-abi-card.component';

describe('UserAbiCardComponent', () => {
  let component: UserAbiCardComponent;
  let fixture: ComponentFixture<UserAbiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAbiCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAbiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
