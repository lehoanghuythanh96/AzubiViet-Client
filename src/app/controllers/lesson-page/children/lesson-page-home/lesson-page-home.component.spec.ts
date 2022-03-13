import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPageHomeComponent } from './lesson-page-home.component';

describe('LessonPageHomeComponent', () => {
  let component: LessonPageHomeComponent;
  let fixture: ComponentFixture<LessonPageHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPageHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
