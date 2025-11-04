import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { PositionsService } from '../positions/positions.service';
import { ClientsResolver } from './clients.resolver';
import { PortfoliosResolver } from './portfolios.resolver';
import { PortfoliosService } from './portfolios.service';

@Module({
  providers: [
    PortfoliosResolver,
    PortfoliosService,
    PrismaService,
    PositionsService,
    ClientsResolver,
  ],
})
export class PortfoliosModule {}
