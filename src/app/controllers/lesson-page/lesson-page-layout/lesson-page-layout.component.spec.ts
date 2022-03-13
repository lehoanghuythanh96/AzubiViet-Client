import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPageLayoutComponent } from './lesson-page-layout.component';

describe('LessonPageLayoutComponent', () => {
  let component: LessonPageLayoutComponent;
  let fixture: ComponentFixture<LessonPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
