import { Controller, Get } from '@nestjs/common';
import { SecuritiesSubgraphService } from './securities-subgraph.service';

@Controller()
export class SecuritiesSubgraphController {
  constructor(private readonly securitiesSubgraphService: SecuritiesSubgraphService) {}

  @Get()
  getHello(): string {
    return this.securitiesSubgraphService.getHello();
  }
}
