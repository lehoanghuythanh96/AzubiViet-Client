import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonAreaSelectorComponent } from './add-lesson-area-selector.component';

describe('AddLessonAreaSelectorComponent', () => {
  let component: AddLessonAreaSelectorComponent;
  let fixture: ComponentFixture<AddLessonAreaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonAreaSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonAreaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
