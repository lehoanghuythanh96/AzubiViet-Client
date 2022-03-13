import { Test, TestingModule } from '@nestjs/testing';
import { QuestionMarketController } from './question-market.controller';

describe('QuestionMarketController', () => {
  let controller: QuestionMarketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionMarketController],
    }).compile();

    controller = module.get<QuestionMarketController>(QuestionMarketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
