import { NestFactory } from '@nestjs/core';
import { PortfoliosSubgraphModule } from './portfolios-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(PortfoliosSubgraphModule);
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
