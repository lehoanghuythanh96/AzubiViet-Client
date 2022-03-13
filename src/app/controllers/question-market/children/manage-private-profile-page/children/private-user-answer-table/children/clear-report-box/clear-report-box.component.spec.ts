import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearReportBoxComponent } from './clear-report-box.component';

describe('ClearReportBoxComponent', () => {
  let component: ClearReportBoxComponent;
  let fixture: ComponentFixture<ClearReportBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClearReportBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearReportBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
