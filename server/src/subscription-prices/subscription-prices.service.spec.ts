import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPricesService } from './subscription-prices.service';

describe('SubscriptionPricesService', () => {
  let service: SubscriptionPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionPricesService],
    }).compile();

    service = module.get<SubscriptionPricesService>(SubscriptionPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
