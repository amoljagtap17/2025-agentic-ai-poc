import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Portfolio } from '../portfolios/entities/portfolio.entity';
import { PortfoliosService } from '../portfolios/portfolios.service';
import { Position } from './entities/position.entity';
import { Security } from './entities/security.entity';
import { PositionsService } from './positions.service';

@Resolver(() => Position)
export class PositionsResolver {
  constructor(
    private readonly positionsService: PositionsService,
    private readonly portfoliosService: PortfoliosService,
  ) {}

  @Query(() => [Position], { name: 'positions' })
  getPositions() {
    return this.positionsService.getPositions();
  }

  @Query(() => [Position], { name: 'positionsByPortfolioId' })
  getPositionsByPortfolioId(portfolioId: string) {
    return this.positionsService.getPositionsByPortfolioId(portfolioId);
  }

  @ResolveField(() => Portfolio, { name: 'portfolio' })
  portfolio(@Parent() position: Position) {
    return this.portfoliosService.getPortfolioById(position.portfolioId);
  }

  @ResolveField(() => Security, { name: 'security' })
  security(@Parent() position: Position) {
    return { __typename: 'Security', id: position.securityId };
  }
}
