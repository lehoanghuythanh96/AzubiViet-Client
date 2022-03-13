import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivateMessagesCardComponent } from './user-private-messages-card.component';

describe('UserPrivateMessagesCardComponent', () => {
  let component: UserPrivateMessagesCardComponent;
  let fixture: ComponentFixture<UserPrivateMessagesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPrivateMessagesCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrivateMessagesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
