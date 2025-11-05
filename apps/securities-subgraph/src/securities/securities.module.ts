import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { PricesService } from '../prices/prices.service';
import { SecuritiesResolver } from './securities.resolver';
import { SecuritiesService } from './securities.service';

@Module({
  providers: [
    SecuritiesResolver,
    SecuritiesService,
    PrismaService,
    PricesService,
  ],
})
export class SecuritiesModule {}
