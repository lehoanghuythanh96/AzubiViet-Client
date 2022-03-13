import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateProductManagerTableComponent } from './private-product-manager-table.component';

describe('PrivateProductManagerTableComponent', () => {
  let component: PrivateProductManagerTableComponent;
  let fixture: ComponentFixture<PrivateProductManagerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateProductManagerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateProductManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
