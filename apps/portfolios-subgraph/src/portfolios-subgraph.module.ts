import { Module } from '@nestjs/common';
import { PortfoliosSubgraphController } from './portfolios-subgraph.controller';
import { PortfoliosSubgraphService } from './portfolios-subgraph.service';

@Module({
  imports: [],
  controllers: [PortfoliosSubgraphController],
  providers: [PortfoliosSubgraphService],
})
export class PortfoliosSubgraphModule {}
