import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthLayoutComponent } from './user-auth-layout.component';

describe('UserAuthLayoutComponent', () => {
  let component: UserAuthLayoutComponent;
  let fixture: ComponentFixture<UserAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAuthLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
