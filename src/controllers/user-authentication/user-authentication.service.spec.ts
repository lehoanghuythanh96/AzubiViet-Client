import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthenticationService } from './user-authentication.service';

describe('UserAuthenticationService', () => {
  let service: UserAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthenticationService],
    }).compile();

    service = module.get<UserAuthenticationService>(UserAuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
