import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QAImagesFormComponent } from './qa-images-form.component';

describe('QAImagesFormComponent', () => {
  let component: QAImagesFormComponent;
  let fixture: ComponentFixture<QAImagesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QAImagesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QAImagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
