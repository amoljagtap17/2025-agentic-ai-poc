import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}

  getPositions() {
    return this.prisma.position.findMany({
      select: {
        id: true,
        securityId: true,
        quantity: true,
        marketValue: true,
        portfolioId: true,
      },
    });
  }

  getPositionsByPortfolioId(portfolioId: string) {
    return this.prisma.position.findMany({
      where: { portfolioId },
      select: {
        id: true,
        securityId: true,
        quantity: true,
        marketValue: true,
        portfolioId: true,
      },
    });
  }
}
