import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Client } from '../shared/client.entity';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Query(() => [Account], { name: 'accounts' })
  getAccounts() {
    return this.accountsService.getAccounts();
  }

  @Query(() => [Account], { name: 'accountsByClientId' })
  getAccountsByClientId(@Args('clientId') clientId: string) {
    return this.accountsService.getAccountsByClientId(clientId);
  }

  @ResolveField(() => Client, { name: 'client' })
  client(@Parent() account: Account) {
    return { __typename: 'Client', id: account.clientId };
  }
}
