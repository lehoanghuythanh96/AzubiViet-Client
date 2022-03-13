import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestQAndAComponent } from './newest-qand-a.component';

describe('NewestQAndAComponent', () => {
  let component: NewestQAndAComponent;
  let fixture: ComponentFixture<NewestQAndAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewestQAndAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestQAndAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
