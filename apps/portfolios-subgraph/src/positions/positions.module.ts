import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { PortfoliosService } from '../portfolios/portfolios.service';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';
import { SecurityResolver } from './security.resolver';

@Module({
  providers: [
    PositionsResolver,
    PositionsService,
    PrismaService,
    PortfoliosService,
    SecurityResolver,
  ],
})
export class PositionsModule {}
