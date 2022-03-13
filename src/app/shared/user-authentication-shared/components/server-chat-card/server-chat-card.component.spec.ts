import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerChatCardComponent } from './server-chat-card.component';

describe('ServerChatCardComponent', () => {
  let component: ServerChatCardComponent;
  let fixture: ComponentFixture<ServerChatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerChatCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerChatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
