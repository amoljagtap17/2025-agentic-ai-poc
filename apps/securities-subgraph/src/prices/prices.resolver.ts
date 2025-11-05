import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Security } from '../securities/entities/security.entity';
import { SecuritiesService } from '../securities/securities.service';
import { Price } from './entities/price.entity';
import { PricesService } from './prices.service';

@Resolver(() => Price)
export class PricesResolver {
  constructor(
    private readonly pricesService: PricesService,
    private readonly securitiesService: SecuritiesService,
  ) {}

  @Query(() => [Price], { name: 'prices' })
  getPrices() {
    return this.pricesService.getPrices();
  }

  @Query(() => [Price], { name: 'pricesBySecurityId' })
  getPricesBySecurityId(@Args('securityId') securityId: string) {
    return this.pricesService.getPricesBySecurityId(securityId);
  }

  @Query(() => Price, { name: 'priceBySecurityIdAndAsOfDate' })
  getPriceBySecurityIdAndAsOfDate(
    @Args('securityId') securityId: string,
    @Args('asOf') asOf: Date,
  ) {
    return this.pricesService.getPriceBySecurityIdAndAsOfDate(securityId, asOf);
  }

  @ResolveField(() => Security, { name: 'security' })
  security(@Parent() price: Price) {
    return this.securitiesService.getSecurityById(price.securityId);
  }
}
