import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QADialogComponent } from './qadialog.component';

describe('QADialogComponent', () => {
  let component: QADialogComponent;
  let fixture: ComponentFixture<QADialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QADialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QADialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
