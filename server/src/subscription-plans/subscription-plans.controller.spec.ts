import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionPlansController } from './subscription-plans.controller';

describe('SubscriptionPlansController', () => {
  let controller: SubscriptionPlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionPlansController],
    }).compile();

    controller = module.get<SubscriptionPlansController>(SubscriptionPlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
