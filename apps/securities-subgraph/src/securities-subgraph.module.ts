import { Module } from '@nestjs/common';
import { SecuritiesSubgraphController } from './securities-subgraph.controller';
import { SecuritiesSubgraphService } from './securities-subgraph.service';

@Module({
  imports: [],
  controllers: [SecuritiesSubgraphController],
  providers: [SecuritiesSubgraphService],
})
export class SecuritiesSubgraphModule {}
