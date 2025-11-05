import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Price } from '../prices/entities/price.entity';
import { PricesService } from '../prices/prices.service';
import { Security } from './entities/security.entity';
import { SecuritiesService } from './securities.service';

@Resolver(() => Security)
export class SecuritiesResolver {
  constructor(
    private readonly securitiesService: SecuritiesService,
    private readonly pricesService: PricesService,
  ) {}

  @Query(() => [Security], { name: 'securities' })
  getSecurities() {
    return this.securitiesService.getSecurities();
  }

  @Query(() => Security, { name: 'security' })
  getSecurityById(@Args('id') id: string) {
    return this.securitiesService.getSecurityById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.securitiesService.getSecurityById(reference.id);
  }

  @ResolveField(() => Price, { name: 'prices' })
  prices(@Parent() security: Security) {
    return this.pricesService.getPricesBySecurityId(security.id);
  }
}
