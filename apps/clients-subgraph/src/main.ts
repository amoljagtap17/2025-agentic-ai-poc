import { NestFactory } from '@nestjs/core';
import { ClientsSubgraphModule } from './clients-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientsSubgraphModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
