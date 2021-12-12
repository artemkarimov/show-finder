import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPricesController } from './subscription-prices.controller';

describe('SubscriptionPricesController', () => {
  let controller: SubscriptionPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionPricesController],
    }).compile();

    controller = module.get<SubscriptionPricesController>(SubscriptionPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
