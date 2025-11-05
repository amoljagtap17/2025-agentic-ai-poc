import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Position } from './entities/position.entity';
import { Security } from './entities/security.entity';
import { PositionsService } from './positions.service';

@Resolver(() => Security)
export class SecurityResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @ResolveField(() => [Position], { name: 'positions' })
  getPositionsBySecurityId(@Parent() security: Security) {
    return this.positionsService.getPositionsBySecurityId(security.id);
  }
}
