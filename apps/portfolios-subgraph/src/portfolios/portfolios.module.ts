import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { PortfoliosResolver } from './portfolios.resolver';
import { PortfoliosService } from './portfolios.service';

@Module({
  providers: [PortfoliosResolver, PortfoliosService, PrismaService],
})
export class PortfoliosModule {}
