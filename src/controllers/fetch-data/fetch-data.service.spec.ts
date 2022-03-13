import { Test, TestingModule } from '@nestjs/testing';
import { FetchDataService } from './fetch-data.service';

describe('FetchDataService', () => {
  let service: FetchDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchDataService],
    }).compile();

    service = module.get<FetchDataService>(FetchDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
