import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { HouseholdsService } from '../households/households.service';
import { ClientsResolver } from './clients.resolver';
import { ClientsService } from './clients.service';

@Module({
  providers: [
    ClientsResolver,
    ClientsService,
    PrismaService,
    HouseholdsService,
  ],
})
export class ClientsModule {}
