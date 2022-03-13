import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserAvatarDialogComponent } from './change-user-avatar-dialog.component';

describe('ChangeUserAvatarDialogComponent', () => {
  let component: ChangeUserAvatarDialogComponent;
  let fixture: ComponentFixture<ChangeUserAvatarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeUserAvatarDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserAvatarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
