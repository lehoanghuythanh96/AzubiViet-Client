import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleLessonComponent } from './single-lesson.component';

describe('SingleLessonComponent', () => {
  let component: SingleLessonComponent;
  let fixture: ComponentFixture<SingleLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
