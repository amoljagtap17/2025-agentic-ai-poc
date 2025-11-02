import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { HouseholdsResolver } from './households.resolver';
import { HouseholdsService } from './households.service';

@Module({
  providers: [
    HouseholdsResolver,
    HouseholdsService,
    PrismaService,
    ClientsService,
  ],
})
export class HouseholdsModule {}
