import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginCardComponent } from './user-login-card.component';

describe('UserLoginCardComponent', () => {
  let component: UserLoginCardComponent;
  let fixture: ComponentFixture<UserLoginCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoginCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
