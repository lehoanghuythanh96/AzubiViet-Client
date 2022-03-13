import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseChatServerCardComponent } from './choose-chat-server-card.component';

describe('ChooseChatServerCardComponent', () => {
  let component: ChooseChatServerCardComponent;
  let fixture: ComponentFixture<ChooseChatServerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseChatServerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseChatServerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
