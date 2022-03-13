import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAreaLayoutComponent } from './admin-area-layout.component';

describe('AdminAreaLayoutComponent', () => {
  let component: AdminAreaLayoutComponent;
  let fixture: ComponentFixture<AdminAreaLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAreaLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAreaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
