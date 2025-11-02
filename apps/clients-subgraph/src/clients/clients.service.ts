import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getClients(): Promise<Client[]> {
    try {
      const clients = await this.prisma.client.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      });

      console.log('Fetched clients:', clients);

      return clients;
    } catch (error) {
      throw new Error(`Failed to get clients: ${error.message}`);
    }
  }
}
