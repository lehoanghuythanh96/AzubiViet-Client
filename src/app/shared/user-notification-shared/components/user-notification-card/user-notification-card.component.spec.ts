import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotificationCardComponent } from './user-notification-card.component';

describe('UserNotificationCardComponent', () => {
  let component: UserNotificationCardComponent;
  let fixture: ComponentFixture<UserNotificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNotificationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
