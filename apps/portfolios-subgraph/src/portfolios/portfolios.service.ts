import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfoliosService {
  constructor(private prisma: PrismaService) {}

  getPortfolios() {
    return this.prisma.portfolio.findMany({
      select: {
        id: true,
        name: true,
        clientId: true,
      },
    });
  }

  getPortfolioById(id: string) {
    return this.prisma.portfolio.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        clientId: true,
      },
    });
  }

  getPortfoliosByClientId(clientId: string) {
    return this.prisma.portfolio.findMany({
      where: { clientId },
      select: {
        id: true,
        name: true,
        clientId: true,
      },
    });
  }
}
