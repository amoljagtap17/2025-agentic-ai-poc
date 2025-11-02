import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Client } from '../shared/client.entity';
import { Portfolio } from './entities/portfolio.entity';
import { PortfoliosService } from './portfolios.service';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Query(() => [Portfolio], { name: 'portfolios' })
  getPortfolios() {
    return this.portfoliosService.getPortfolios();
  }

  @Query(() => [Portfolio], { name: 'portfoliosByClientId' })
  getPortfoliosByClientId(clientId: string) {
    return this.portfoliosService.getPortfoliosByClientId(clientId);
  }

  @ResolveField(() => Client, { name: 'client' })
  client(@Parent() portfolio: Portfolio) {
    return { __typename: 'Client', id: portfolio.clientId };
  }
}
