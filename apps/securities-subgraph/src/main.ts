import { NestFactory } from '@nestjs/core';
import { SecuritiesSubgraphModule } from './securities-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(SecuritiesSubgraphModule);
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
