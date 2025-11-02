import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Client, RelationType } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClients(): Promise<Client[]> {
    const clients = await this.prisma.client.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        relationType: true,
      },
    });

    return clients.map((client) => ({
      ...client,
      relationType: client.relationType as RelationType | null,
    }));
  }
}
