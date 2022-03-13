import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductAnswerImgFormComponent } from './new-product-answer-img-form.component';

describe('NewProductAnswerImgFormComponent', () => {
  let component: NewProductAnswerImgFormComponent;
  let fixture: ComponentFixture<NewProductAnswerImgFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductAnswerImgFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductAnswerImgFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
