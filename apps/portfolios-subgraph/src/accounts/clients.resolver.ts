import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Client } from '../shared/client.entity';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';

@Resolver(() => Client)
export class ClientsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @ResolveField(() => [Account], { name: 'accounts' })
  getAccounts(@Parent() client: Client) {
    console.log('aj - client.id:', client.id);
    return this.accountsService.getAccountsByClientId(client.id);
  }
}
