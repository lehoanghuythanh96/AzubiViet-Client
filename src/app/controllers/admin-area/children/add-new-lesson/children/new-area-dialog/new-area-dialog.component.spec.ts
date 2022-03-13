import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAreaDialogComponent } from './new-area-dialog.component';

describe('NewAreaDialogComponent', () => {
  let component: NewAreaDialogComponent;
  let fixture: ComponentFixture<NewAreaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAreaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAreaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
