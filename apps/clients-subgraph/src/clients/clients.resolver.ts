import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Household } from '../households/entities/household.entity';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly clientsService: ClientsService) {}

  @Query(() => [Client], { name: 'clients' })
  getClients() {
    return this.clientsService.getClients();
  }

  @ResolveField(() => Household, { name: 'household' })
  getHousehold(@Parent() client: Client) {
    return { __typename: 'Household', id: client.householdId };
  }
}
