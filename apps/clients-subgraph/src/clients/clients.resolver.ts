import { Query, Resolver } from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Query(() => [Client], { name: 'clients' })
  getClients() {
    return this.clientsService.getClients();
  }
}
