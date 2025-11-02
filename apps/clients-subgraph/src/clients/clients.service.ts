import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  getClients() {
    return this.prisma.client.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        relationType: true,
      },
    });
  }

  getClientsByHouseholdId(householdId: string) {
    return this.prisma.client.findMany({
      where: { householdId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        relationType: true,
      },
    });
  }
}
