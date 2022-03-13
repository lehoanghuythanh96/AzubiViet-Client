import { Test, TestingModule } from '@nestjs/testing';
import { QuestionMarketService } from './question-market.service';

describe('QuestionMarketService', () => {
  let service: QuestionMarketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionMarketService],
    }).compile();

    service = module.get<QuestionMarketService>(QuestionMarketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
