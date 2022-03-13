import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticleBgComponent } from './particle-bg.component';

describe('ParticleBgComponent', () => {
  let component: ParticleBgComponent;
  let fixture: ComponentFixture<ParticleBgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticleBgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticleBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
