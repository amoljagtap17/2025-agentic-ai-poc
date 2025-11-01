import { Controller, Get } from '@nestjs/common';
import { PerformancesSubgraphService } from './performances-subgraph.service';

@Controller()
export class PerformancesSubgraphController {
  constructor(private readonly performancesSubgraphService: PerformancesSubgraphService) {}

  @Get()
  getHello(): string {
    return this.performancesSubgraphService.getHello();
  }
}
