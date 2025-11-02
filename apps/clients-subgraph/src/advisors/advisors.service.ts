import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvisorsService {
  constructor(private prisma: PrismaService) {}

  getAdvisors() {
    return this.prisma.advisor.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  getAdvisorById(id: string) {
    return this.prisma.advisor.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  getAdvisorByEmail(email: string) {
    return this.prisma.advisor.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
