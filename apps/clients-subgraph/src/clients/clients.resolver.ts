import {
  Args,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
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

  @Query(() => [Client], { name: 'clientsByHouseholdId' })
  getClientsByHouseholdId(@Args('householdId') householdId: string) {
    return this.clientsService.getClientsByHouseholdId(householdId);
  }

  @ResolveField(() => Household, { name: 'household' })
  getHousehold(@Parent() client: Client) {
    return this.householdsService.getHouseholdById(client.householdId);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.clientsService.getClientById(reference.id);
  }
}
