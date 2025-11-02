import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Client } from '../shared/client.entity';
import { Portfolio } from './entities/portfolio.entity';
import { PortfoliosService } from './portfolios.service';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @ResolveField(() => [Portfolio], { name: 'portfolios' })
  getPortfolios(@Parent() client: Client) {
    return this.portfoliosService.getPortfoliosByClientId(client.id);
  }
}
