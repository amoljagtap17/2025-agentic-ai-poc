import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { HouseholdsService } from '../households/households.service';
import { AdvisorsResolver } from './advisors.resolver';
import { AdvisorsService } from './advisors.service';

@Module({
  providers: [
    AdvisorsResolver,
    AdvisorsService,
    PrismaService,
    HouseholdsService,
  ],
})
export class AdvisorsModule {}
