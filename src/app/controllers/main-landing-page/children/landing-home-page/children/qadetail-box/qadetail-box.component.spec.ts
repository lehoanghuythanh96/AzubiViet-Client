import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QADetailBoxComponent } from './qadetail-box.component';

describe('QADetailBoxComponent', () => {
  let component: QADetailBoxComponent;
  let fixture: ComponentFixture<QADetailBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QADetailBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QADetailBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
