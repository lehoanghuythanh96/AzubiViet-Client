import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductImageFormComponent } from './new-product-image-form.component';

describe('NewProductImageFormComponent', () => {
  let component: NewProductImageFormComponent;
  let fixture: ComponentFixture<NewProductImageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductImageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
