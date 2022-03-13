import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleBGComponent } from './particle-bg.component';

describe('ParticleBGComponent', () => {
  let component: ParticleBGComponent;
  let fixture: ComponentFixture<ParticleBGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleBGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleBGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
