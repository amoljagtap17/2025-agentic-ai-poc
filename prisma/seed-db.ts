import { faker } from '@faker-js/faker';
import 'dotenv/config';
import {
  AccountType,
  AssetClass,
  PrismaClient,
  RelationType,
} from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Cleaning existing data...');
  await prisma.price.deleteMany();
  await prisma.position.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.account.deleteMany();
  await prisma.client.deleteMany();
  await prisma.household.deleteMany();
  await prisma.advisor.deleteMany();
  await prisma.security.deleteMany();

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

  const allClients: any[] = [];

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
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${faker.internet.domainName()}`, // Ensure unique emails
            phone,
            relationType,
            householdId: household.id,
          },
        });

        allClients.push(client);

        console.log(
          `  Created client: ${client.firstName} ${client.lastName} (${relationType})`,
        );
      }
    }
  }

  // Create Accounts for each client (1-3 accounts per client)
  console.log('💳 Creating accounts...');

  const accountTypes = [
    AccountType.BROKERAGE,
    AccountType.RETIREMENT,
    AccountType.CASH,
  ];
  const allAccounts: any[] = [];

  for (const client of allClients) {
    const numAccounts = Math.floor(Math.random() * 3) + 1; // 1-3 accounts

    for (let i = 0; i < numAccounts; i++) {
      const accountType = faker.helpers.arrayElement(accountTypes);
      const aum = parseFloat(
        faker.finance.amount({ min: 10000, max: 5000000, dec: 2 }),
      );

      const account = await prisma.account.create({
        data: {
          clientId: client.id,
          number: faker.finance.accountNumber(),
          type: accountType,
          aum: aum,
        },
      });

      allAccounts.push(account);
      console.log(
        `  Created ${accountType} account: ${account.number} for ${client.firstName} ${client.lastName} (AUM: $${account.aum.toLocaleString()})`,
      );
    }
  }

  // Create Portfolios for each client (1-3 portfolios per client)
  console.log('📊 Creating portfolios...');

  const portfolioNames = [
    'Conservative Growth',
    'Aggressive Growth',
    'Income Focus',
    'Balanced',
    'Technology Focus',
    'ESG Portfolio',
    'International',
    'Large Cap',
    'Small Cap',
    'Bond Portfolio',
  ];
  const allPortfolios: any[] = [];

  for (const client of allClients) {
    const numPortfolios = Math.floor(Math.random() * 3) + 1; // 1-3 portfolios

    for (let i = 0; i < numPortfolios; i++) {
      const portfolioName = faker.helpers.arrayElement(portfolioNames);
      const portfolio = await prisma.portfolio.create({
        data: {
          clientId: client.id,
          name: `${client.firstName}'s ${portfolioName}`,
        },
      });

      allPortfolios.push(portfolio);
      console.log(`  Created portfolio: ${portfolio.name}`);
    }
  }

  // Create Securities first
  console.log('🏛️ Creating securities...');

  const assetClasses = [
    AssetClass.EQUITY,
    AssetClass.BOND,
    AssetClass.ETF,
    AssetClass.MUTUAL_FUND,
    AssetClass.CASH,
  ];

  const securities: any[] = [];
  const tickers = [
    'AAPL',
    'GOOGL',
    'MSFT',
    'AMZN',
    'TSLA',
    'NVDA',
    'META',
    'BRK.B',
    'JNJ',
    'V',
    'PG',
    'UNH',
    'HD',
    'CVX',
    'MA',
    'ABBV',
    'PFE',
    'KO',
    'PEP',
    'TMO',
  ];

  for (let i = 0; i < 20; i++) {
    const ticker = tickers[i];
    const assetClass = faker.helpers.arrayElement(assetClasses);

    const security = await prisma.security.create({
      data: {
        ticker: ticker,
        isin: `US${faker.string.alphanumeric(10).toUpperCase()}`,
        cusip: faker.string.alphanumeric(9).toUpperCase(),
        name: `${faker.company.name()} ${assetClass === AssetClass.ETF ? 'ETF' : assetClass === AssetClass.MUTUAL_FUND ? 'Fund' : 'Corp'}`,
        assetClass: assetClass,
      },
    });

    securities.push(security);

    // Create current price for the security
    const currentPrice = parseFloat(
      faker.finance.amount({ min: 10, max: 500, dec: 2 }),
    );
    await prisma.price.create({
      data: {
        securityId: security.id,
        asOf: new Date(),
        value: currentPrice,
        currency: 'USD',
      },
    });

    console.log(
      `  Created security: ${security.ticker} - ${security.name} (${security.assetClass}) @ $${currentPrice.toFixed(2)}`,
    );
  }

  // Create Positions for each portfolio (1-3 positions per portfolio)
  console.log('📈 Creating positions...');

  for (const portfolio of allPortfolios) {
    const numPositions = Math.floor(Math.random() * 3) + 1; // 1-3 positions

    for (let i = 0; i < numPositions; i++) {
      const randomSecurity = faker.helpers.arrayElement(securities);

      // Get the current price for this security
      const priceRecord = await prisma.price.findFirst({
        where: { securityId: randomSecurity.id },
        orderBy: { asOf: 'desc' },
      });

      const quantity = parseFloat(
        faker.finance.amount({ min: 1, max: 1000, dec: 2 }),
      );
      const pricePerShare = priceRecord
        ? priceRecord.value
        : parseFloat(faker.finance.amount({ min: 10, max: 500, dec: 2 }));
      const marketValue = parseFloat((quantity * pricePerShare).toFixed(2));

      const position = await prisma.position.create({
        data: {
          portfolioId: portfolio.id,
          securityId: randomSecurity.id,
          quantity: quantity,
          marketValue: marketValue,
        },
      });

      console.log(
        `  Created position: ${quantity} shares of ${randomSecurity.ticker} @ $${pricePerShare.toFixed(2)} (Market Value: $${marketValue.toLocaleString()}) in ${portfolio.name}`,
      );
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
  const accountCount = await prisma.account.count();
  const portfolioCount = await prisma.portfolio.count();
  const securityCount = await prisma.security.count();
  const priceCount = await prisma.price.count();
  const positionCount = await prisma.position.count();

  const spouseCount = await prisma.client.count({
    where: { relationType: RelationType.SPOUSE },
  });
  const childCount = await prisma.client.count({
    where: { relationType: RelationType.CHILD },
  });
  const parentCount = await prisma.client.count({
    where: { relationType: RelationType.PARENT },
  });

  const brokerageAccountCount = await prisma.account.count({
    where: { type: AccountType.BROKERAGE },
  });
  const retirementAccountCount = await prisma.account.count({
    where: { type: AccountType.RETIREMENT },
  });
  const cashAccountCount = await prisma.account.count({
    where: { type: AccountType.CASH },
  });

  const equityCount = await prisma.security.count({
    where: { assetClass: AssetClass.EQUITY },
  });
  const bondCount = await prisma.security.count({
    where: { assetClass: AssetClass.BOND },
  });
  const etfCount = await prisma.security.count({
    where: { assetClass: AssetClass.ETF },
  });
  const mutualFundCount = await prisma.security.count({
    where: { assetClass: AssetClass.MUTUAL_FUND },
  });

  console.log('\n📊 Seeding Summary:');
  console.log(`✅ Advisors: ${advisorCount}`);
  console.log(`✅ Households: ${householdCount}`);
  console.log(`✅ Total Clients: ${clientCount}`);
  console.log(`   - Spouses: ${spouseCount}`);
  console.log(`   - Children: ${childCount}`);
  console.log(`   - Parents: ${parentCount}`);
  console.log(`✅ Total Accounts: ${accountCount}`);
  console.log(`   - Brokerage: ${brokerageAccountCount}`);
  console.log(`   - Retirement: ${retirementAccountCount}`);
  console.log(`   - Cash: ${cashAccountCount}`);
  console.log(`✅ Total Securities: ${securityCount}`);
  console.log(`   - Equities: ${equityCount}`);
  console.log(`   - Bonds: ${bondCount}`);
  console.log(`   - ETFs: ${etfCount}`);
  console.log(`   - Mutual Funds: ${mutualFundCount}`);
  console.log(`✅ Total Prices: ${priceCount}`);
  console.log(`✅ Total Portfolios: ${portfolioCount}`);
  console.log(`✅ Total Positions: ${positionCount}`);

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
