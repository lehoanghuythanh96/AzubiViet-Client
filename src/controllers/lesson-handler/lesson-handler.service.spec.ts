import { Test, TestingModule } from '@nestjs/testing';
import { LessonHandlerService } from './lesson-handler.service';

describe('LessonHandlerService', () => {
  let service: LessonHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonHandlerService],
    }).compile();

    service = module.get<LessonHandlerService>(LessonHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
