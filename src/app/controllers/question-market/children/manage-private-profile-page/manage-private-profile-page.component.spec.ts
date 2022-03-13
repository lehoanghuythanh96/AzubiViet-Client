import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePrivateProfilePageComponent } from './manage-private-profile-page.component';

describe('ManagePrivateProfilePageComponent', () => {
  let component: ManagePrivateProfilePageComponent;
  let fixture: ComponentFixture<ManagePrivateProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePrivateProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePrivateProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
