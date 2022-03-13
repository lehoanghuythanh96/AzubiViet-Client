import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductAvatarFormComponent } from './new-product-avatar-form.component';

describe('NewProductAvatarFormComponent', () => {
  let component: NewProductAvatarFormComponent;
  let fixture: ComponentFixture<NewProductAvatarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductAvatarFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductAvatarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
