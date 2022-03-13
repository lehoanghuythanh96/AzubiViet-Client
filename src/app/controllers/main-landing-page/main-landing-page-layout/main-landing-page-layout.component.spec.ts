import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLandingPageLayoutComponent } from './main-landing-page-layout.component';

describe('MainLandingPageLayoutComponent', () => {
  let component: MainLandingPageLayoutComponent;
  let fixture: ComponentFixture<MainLandingPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLandingPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLandingPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
