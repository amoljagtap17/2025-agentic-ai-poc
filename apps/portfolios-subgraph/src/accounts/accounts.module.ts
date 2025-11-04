import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { ClientsResolver } from './clients.resolver';

@Module({
  providers: [
    AccountsResolver,
    AccountsService,
    PrismaService,
    ClientsResolver,
  ],
})
export class AccountsModule {}
