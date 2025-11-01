import { Controller, Get } from '@nestjs/common';
import { ClientsSubgraphService } from './clients-subgraph.service';

@Controller()
export class ClientsSubgraphController {
  constructor(private readonly clientsSubgraphService: ClientsSubgraphService) {}

  @Get()
  getHello(): string {
    return this.clientsSubgraphService.getHello();
  }
}
