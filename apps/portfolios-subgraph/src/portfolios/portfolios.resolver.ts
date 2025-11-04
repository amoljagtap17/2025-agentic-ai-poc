import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Position } from '../positions/entities/position.entity';
import { PositionsService } from '../positions/positions.service';
import { Client } from '../shared/client.entity';
import { Portfolio } from './entities/portfolio.entity';
import { PortfoliosService } from './portfolios.service';

@Resolver(() => Portfolio)
export class PortfoliosResolver {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private readonly positionsService: PositionsService,
  ) {}

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

  @ResolveField(() => [Position], { name: 'positions' })
  getPositionsForPortfolio(@Parent() portfolio: Portfolio) {
    return this.positionsService.getPositionsByPortfolioId(portfolio.id);
  }
}
