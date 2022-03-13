import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHomePageComponent } from './landing-home-page.component';

describe('LandingHomePageComponent', () => {
  let component: LandingHomePageComponent;
  let fixture: ComponentFixture<LandingHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
