import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { SecuritiesService } from '../securities/securities.service';
import { PricesResolver } from './prices.resolver';
import { PricesService } from './prices.service';

@Module({
  providers: [PricesResolver, PricesService, PrismaService, SecuritiesService],
})
export class PricesModule {}
