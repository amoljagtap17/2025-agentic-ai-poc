import { NestFactory } from '@nestjs/core';
import { PortfoliosSubgraphModule } from './portfolios-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(PortfoliosSubgraphModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
