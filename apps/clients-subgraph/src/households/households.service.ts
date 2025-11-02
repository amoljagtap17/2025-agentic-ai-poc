import { PrismaService } from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HouseholdsService {
  constructor(private prisma: PrismaService) {}

  getHouseholds() {
    return this.prisma.household.findMany({
      select: {
        id: true,
        name: true,
        advisorId: true,
      },
    });
  }

  getHouseholdById(id: string) {
    return this.prisma.household.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        advisorId: true,
      },
    });
  }

  getHouseholdsByAdvisorId(advisorId: string) {
    return this.prisma.household.findMany({
      where: { advisorId },
      select: {
        id: true,
        name: true,
        advisorId: true,
      },
    });
  }
}
