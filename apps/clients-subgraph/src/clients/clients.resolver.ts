import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Household } from '../households/entities/household.entity';
import { HouseholdsService } from '../households/households.service';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly householdsService: HouseholdsService,
  ) {}

  @Query(() => [Client], { name: 'clients' })
  getClients() {
    return this.clientsService.getClients();
  }

  @ResolveField(() => Household, { name: 'household' })
  getHousehold(@Parent() client: Client) {
    return this.householdsService.getHouseholdById(client.householdId);
  }
}
