import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlKickUserRequirementComponent } from './control-kick-user-requirement.component';

describe('ControlKickUserRequirementComponent', () => {
  let component: ControlKickUserRequirementComponent;
  let fixture: ComponentFixture<ControlKickUserRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlKickUserRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlKickUserRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
