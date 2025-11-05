import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  getPrices() {
    return this.prisma.price.findMany({
      select: {
        asOf: true,
        currency: true,
        value: true,
        securityId: true,
      },
    });
  }

  getPricesBySecurityId(securityId: string) {
    return this.prisma.price.findMany({
      where: { securityId },
      select: {
        asOf: true,
        currency: true,
        value: true,
        securityId: true,
      },
    });
  }

  getPriceBySecurityIdAndAsOfDate(securityId: string, asOf: Date) {
    return this.prisma.price.findFirst({
      where: { securityId, asOf },
      select: {
        asOf: true,
        currency: true,
        value: true,
        securityId: true,
      },
    });
  }
}
