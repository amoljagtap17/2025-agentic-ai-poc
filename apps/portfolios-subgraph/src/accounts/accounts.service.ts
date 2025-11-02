import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  getAccounts() {
    return this.prisma.account.findMany({
      select: {
        id: true,
        number: true,
        type: true,
        aum: true,
        clientId: true,
      },
    });
  }

  getAccountsByClientId(clientId: string) {
    return this.prisma.account.findMany({
      where: { clientId },
      select: {
        id: true,
        number: true,
        type: true,
        aum: true,
        clientId: true,
      },
    });
  }
}
