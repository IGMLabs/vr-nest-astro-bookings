import { Test, TestingModule } from '@nestjs/testing';
import { JwcStrategyService } from './jwc-strategy.service';

describe('JwcStrategyService', () => {
  let service: JwcStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwcStrategyService],
    }).compile();

    service = module.get<JwcStrategyService>(JwcStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
