import { Module } from '@nestjs/common';
import { ClientsSubgraphController } from './clients-subgraph.controller';
import { ClientsSubgraphService } from './clients-subgraph.service';

@Module({
  imports: [],
  controllers: [ClientsSubgraphController],
  providers: [ClientsSubgraphService],
})
export class ClientsSubgraphModule {}
