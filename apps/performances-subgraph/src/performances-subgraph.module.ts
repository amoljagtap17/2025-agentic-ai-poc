import { Module } from '@nestjs/common';
import { PerformancesSubgraphController } from './performances-subgraph.controller';
import { PerformancesSubgraphService } from './performances-subgraph.service';

@Module({
  imports: [],
  controllers: [PerformancesSubgraphController],
  providers: [PerformancesSubgraphService],
})
export class PerformancesSubgraphModule {}
