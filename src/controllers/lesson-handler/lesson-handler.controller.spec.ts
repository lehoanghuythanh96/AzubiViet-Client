import { Test, TestingModule } from '@nestjs/testing';
import { LessonHandlerController } from './lesson-handler.controller';

describe('LessonHandlerController', () => {
  let controller: LessonHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonHandlerController],
    }).compile();

    controller = module.get<LessonHandlerController>(LessonHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
