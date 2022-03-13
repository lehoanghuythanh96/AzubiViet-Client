import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheAnswererIsPunishedComponent } from './the-answerer-is-punished.component';

describe('TheAnswererIsPunishedComponent', () => {
  let component: TheAnswererIsPunishedComponent;
  let fixture: ComponentFixture<TheAnswererIsPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheAnswererIsPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheAnswererIsPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
