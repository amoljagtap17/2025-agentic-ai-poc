import { Controller, Get } from '@nestjs/common';
import { PortfoliosSubgraphService } from './portfolios-subgraph.service';

@Controller()
export class PortfoliosSubgraphController {
  constructor(private readonly portfoliosSubgraphService: PortfoliosSubgraphService) {}

  @Get()
  getHello(): string {
    return this.portfoliosSubgraphService.getHello();
  }
}
