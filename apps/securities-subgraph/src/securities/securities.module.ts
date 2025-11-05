import { PrismaService } from '@app/common';
import { Module } from '@nestjs/common';
import { SecuritiesResolver } from './securities.resolver';
import { SecuritiesService } from './securities.service';

@Module({
  providers: [SecuritiesResolver, SecuritiesService, PrismaService],
})
export class SecuritiesModule {}
