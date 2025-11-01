import { NestFactory } from '@nestjs/core';
import { PerformancesSubgraphModule } from './performances-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(PerformancesSubgraphModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
