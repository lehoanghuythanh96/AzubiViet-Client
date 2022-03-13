import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLessonPageComponent } from './choose-lesson-page.component';

describe('ChooseLessonPageComponent', () => {
  let component: ChooseLessonPageComponent;
  let fixture: ComponentFixture<ChooseLessonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLessonPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLessonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
