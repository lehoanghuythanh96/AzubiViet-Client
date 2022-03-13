import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAndABoxComponent } from './qand-abox.component';

describe('QAndABoxComponent', () => {
  let component: QAndABoxComponent;
  let fixture: ComponentFixture<QAndABoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAndABoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAndABoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
