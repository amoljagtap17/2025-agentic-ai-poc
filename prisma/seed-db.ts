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

  // Create 10 Households (distribute across advisors)
  console.log('🏠 Creating households...');

  const households: any[] = [];

  for (let i = 0; i < 10; i++) {
    const randomAdvisor = advisors[i % advisors.length]; // Distribute evenly across advisors

    // Generate a family surname that will be shared by all members
    const familyLastName = faker.person.lastName();

    const household = await prisma.household.create({
      data: {
        name: `${familyLastName} Family`,
        advisorId: randomAdvisor.id,
      },
    });

    // Store the family name with the household for later use
    households.push({ ...household, familyLastName });

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
      // Create 1-3 clients per relation type depending on relation type
      let numClients;
      if (relationType === RelationType.SPOUSE) {
        numClients = Math.random() > 0.5 ? 1 : 2; // 1 or 2 spouses
      } else if (relationType === RelationType.PARENT) {
        numClients = Math.random() > 0.3 ? 2 : 1; // Usually 2 parents, sometimes 1
      } else {
        numClients = Math.floor(Math.random() * 4) + 1; // 1-4 children
      }

      for (let i = 0; i < numClients; i++) {
        const firstName = faker.person.firstName();
        // Use the family surname for all members of the household
        const lastName = household.familyLastName;
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
          `  Created client: ${client.firstName} ${client.lastName} (${relationType})`,
        );
      }
    }
  }

  /* // Create some clients without households (orphaned clients)
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
  } */

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
