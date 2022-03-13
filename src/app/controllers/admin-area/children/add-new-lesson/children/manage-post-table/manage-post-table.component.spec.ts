import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePostTableComponent } from './manage-post-table.component';

describe('ManagePostTableComponent', () => {
  let component: ManagePostTableComponent;
  let fixture: ComponentFixture<ManagePostTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePostTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePostTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
