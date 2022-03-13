import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockChatUserDialogComponent } from './block-chat-user-dialog.component';

describe('BlockChatUserDialogComponent', () => {
  let component: BlockChatUserDialogComponent;
  let fixture: ComponentFixture<BlockChatUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockChatUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockChatUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
