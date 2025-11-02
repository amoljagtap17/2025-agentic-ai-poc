import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { AdvisorsService } from '../advisors/advisors.service';
import { ClientsService } from '../clients/clients.service';
import { HouseholdsResolver } from './households.resolver';
import { HouseholdsService } from './households.service';

@Module({
  providers: [
    HouseholdsResolver,
    HouseholdsService,
    AdvisorsService,
    PrismaService,
    ClientsService,
  ],
})
export class HouseholdsModule {}
