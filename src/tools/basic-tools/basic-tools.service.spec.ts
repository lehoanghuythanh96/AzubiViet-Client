import { Test, TestingModule } from '@nestjs/testing';
import { BasicToolsService } from './basic-tools.service';

describe('BasicToolsService', () => {
  let service: BasicToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicToolsService],
    }).compile();

    service = module.get<BasicToolsService>(BasicToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
