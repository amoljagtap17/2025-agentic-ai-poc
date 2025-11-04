import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { PortfoliosService } from '../portfolios/portfolios.service';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';

@Module({
  providers: [
    PositionsResolver,
    PositionsService,
    PrismaService,
    PortfoliosService,
  ],
})
export class PositionsModule {}
