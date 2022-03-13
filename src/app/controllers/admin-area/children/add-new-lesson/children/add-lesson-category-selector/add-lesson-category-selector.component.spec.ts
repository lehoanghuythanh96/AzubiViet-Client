import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonCategorySelectorComponent } from './add-lesson-category-selector.component';

describe('AddLessonCategorySelectorComponent', () => {
  let component: AddLessonCategorySelectorComponent;
  let fixture: ComponentFixture<AddLessonCategorySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonCategorySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLessonCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
