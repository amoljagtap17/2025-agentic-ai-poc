import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SecuritiesService {
  constructor(private prisma: PrismaService) {}

  getSecurities() {
    return this.prisma.security.findMany({
      select: {
        id: true,
        name: true,
        ticker: true,
        isin: true,
        cusip: true,
        assetClass: true,
      },
    });
  }

  getSecurityById(id: string) {
    return this.prisma.security.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        ticker: true,
        isin: true,
        cusip: true,
        assetClass: true,
      },
    });
  }
}
