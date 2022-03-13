import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionproductReporterIdPunishedComponent } from './questionproduct-reporter-id-punished.component';

describe('QuestionproductReporterIdPunishedComponent', () => {
  let component: QuestionproductReporterIdPunishedComponent;
  let fixture: ComponentFixture<QuestionproductReporterIdPunishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionproductReporterIdPunishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionproductReporterIdPunishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
