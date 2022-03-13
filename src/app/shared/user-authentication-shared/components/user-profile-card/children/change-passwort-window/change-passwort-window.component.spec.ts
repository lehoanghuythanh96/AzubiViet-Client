import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswortWindowComponent } from './change-passwort-window.component';

describe('ChangePasswortWindowComponent', () => {
  let component: ChangePasswortWindowComponent;
  let fixture: ComponentFixture<ChangePasswortWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswortWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswortWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
