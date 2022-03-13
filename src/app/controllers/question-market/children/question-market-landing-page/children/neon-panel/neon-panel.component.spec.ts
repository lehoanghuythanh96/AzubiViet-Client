import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeonPanelComponent } from './neon-panel.component';

describe('NeonPanelComponent', () => {
  let component: NeonPanelComponent;
  let fixture: ComponentFixture<NeonPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeonPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
