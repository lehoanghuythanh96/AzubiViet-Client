import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredReportsTableComponent } from './expired-reports-table.component';

describe('ExpiredReportsTableComponent', () => {
  let component: ExpiredReportsTableComponent;
  let fixture: ComponentFixture<ExpiredReportsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredReportsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredReportsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
