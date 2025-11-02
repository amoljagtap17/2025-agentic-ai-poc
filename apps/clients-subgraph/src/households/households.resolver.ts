import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Advisor } from '../advisors/entities/advisor.entity';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { Household } from './entities/household.entity';
import { HouseholdsService } from './households.service';

@Resolver(() => Household)
export class HouseholdsResolver {
  constructor(
    private readonly householdsService: HouseholdsService,
    private readonly clientsService: ClientsService,
  ) {}

  @Query(() => [Household], { name: 'households' })
  getHouseholds() {
    return this.householdsService.getHouseholds();
  }

  @ResolveField(() => Advisor, { name: 'advisor' })
  getAdvisor(@Parent() household: Household) {
    return { __typename: 'Advisor', id: household.advisorId };
  }

  @ResolveField(() => [Client], { name: 'members' })
  getClientsForHousehold(@Parent() household: Household) {
    return this.clientsService.getClientsByHouseholdId(household.id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.householdsService.getHouseholdById(reference.id);
  }
}
