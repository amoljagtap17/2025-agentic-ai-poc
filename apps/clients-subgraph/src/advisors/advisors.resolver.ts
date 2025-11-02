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
import { AdvisorsService } from './advisors.service';
import { Advisor } from './entities/advisor.entity';

@Resolver(() => Advisor)
export class AdvisorsResolver {
  constructor(
    private readonly advisorsService: AdvisorsService,
    private readonly householdsService: HouseholdsService,
  ) {}

  @Query(() => [Advisor], { name: 'advisors' })
  getAdvisors() {
    return this.advisorsService.getAdvisors();
  }

  @Query(() => Advisor, { name: 'advisor' })
  getAdvisorByEmail(@Args('email') email: string) {
    return this.advisorsService.getAdvisorByEmail(email);
  }

  @ResolveField(() => [Household], { name: 'households' })
  getHouseholdsForAdvisor(@Parent() advisor: Advisor) {
    return this.householdsService.getHouseholdsByAdvisorId(advisor.id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.advisorsService.getAdvisorById(reference.id);
  }
}
