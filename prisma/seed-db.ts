import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { PrismaClient, RelationType } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.client.deleteMany();
  await prisma.household.deleteMany();
  await prisma.advisor.deleteMany();

  // Create 5 Advisors
  console.log('👨‍💼 Creating advisors...');

  const advisors: any[] = [];

  for (let i = 0; i < 5; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const advisor = await prisma.advisor.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
      },
    });

    advisors.push(advisor);

    console.log(`Created advisor: ${advisor.name}`);
  }

  // Create 5 Households (distribute across advisors)
  console.log('🏠 Creating households...');

  const households: any[] = [];

  for (let i = 0; i < 5; i++) {
    const randomAdvisor = advisors[i];

    const household = await prisma.household.create({
      data: {
        name: `Household ${i + 1}`,
        advisorId: randomAdvisor.id,
      },
    });

    households.push(household);

    console.log(
      `Created household: ${household.name} (Advisor: ${randomAdvisor.name})`,
    );
  }

  // Create Clients with different relation types
  console.log('👥 Creating clients...');

  const relationTypes = [
    RelationType.SPOUSE,
    RelationType.CHILD,
    RelationType.PARENT,
  ];

  for (const household of households) {
    // Determine how many relation types this household will have (1, 2, or 3)
    const numRelationTypes = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
    const selectedRelationTypes = faker.helpers.arrayElements(
      relationTypes,
      numRelationTypes,
    );

    console.log(
      `Creating clients for ${household.name} with relations: ${selectedRelationTypes.join(', ')}`,
    );

    // Create clients for each selected relation type
    for (const relationType of selectedRelationTypes) {
      // Create 1-3 clients per relation type
      const numClients = Math.floor(Math.random() * 3) + 1;

      for (let i = 0; i < numClients; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });
        const phone = faker.phone.number();

        const client = await prisma.client.create({
          data: {
            firstName,
            lastName,
            email,
            phone,
            relationType,
            householdId: household.id,
          },
        });

        console.log(
          `Created client: ${client.firstName} ${client.lastName} (${relationType})`,
        );
      }
    }
  }

  // Create some clients without households (orphaned clients)
  console.log('👤 Creating some clients without households...');
  for (let i = 0; i < 5; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const client = await prisma.client.create({
      data: {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone: faker.phone.number(),
        relationType: faker.helpers.arrayElement(relationTypes),
        householdId: null, // No household
      },
    });

    console.log(
      `    Created orphaned client: ${client.firstName} ${client.lastName} (${client.relationType})`,
    );
  }

  // Print summary
  const advisorCount = await prisma.advisor.count();
  const householdCount = await prisma.household.count();
  const clientCount = await prisma.client.count();
  const spouseCount = await prisma.client.count({
    where: { relationType: RelationType.SPOUSE },
  });
  const childCount = await prisma.client.count({
    where: { relationType: RelationType.CHILD },
  });
  const parentCount = await prisma.client.count({
    where: { relationType: RelationType.PARENT },
  });

  console.log('\n📊 Seeding Summary:');
  console.log(`✅ Advisors: ${advisorCount}`);
  console.log(`✅ Households: ${householdCount}`);
  console.log(`✅ Total Clients: ${clientCount}`);
  console.log(`   - Spouses: ${spouseCount}`);
  console.log(`   - Children: ${childCount}`);
  console.log(`   - Parents: ${parentCount}`);

  console.log('\n🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
