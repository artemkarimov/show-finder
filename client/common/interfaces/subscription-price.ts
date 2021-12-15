import StreamingService from './streaming-service';
import Country from './country';
import SubscriptionPlan from './subscription-plan';

interface SubscriptionPrice {
  id: number;
  cost: string;
  streamingService: StreamingService;
  country: Country;
  subscriptionPlan: SubscriptionPlan;
}

export default SubscriptionPrice;
