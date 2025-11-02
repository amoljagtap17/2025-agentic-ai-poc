import { Query, Resolver } from '@nestjs/graphql';
import { Position } from './entities/position.entity';
import { PositionsService } from './positions.service';

@Resolver(() => Position)
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Query(() => [Position], { name: 'positions' })
  getPositions() {
    return this.positionsService.getPositions();
  }

  @Query(() => [Position], { name: 'positionsByPortfolioId' })
  getPositionsByPortfolioId(portfolioId: string) {
    return this.positionsService.getPositionsByPortfolioId(portfolioId);
  }
}
