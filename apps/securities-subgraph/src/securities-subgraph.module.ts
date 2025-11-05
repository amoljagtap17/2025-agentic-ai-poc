import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PricesModule } from './prices/prices.module';
import { Position } from './securities/entities/position.entity';
import { SecuritiesModule } from './securities/securities.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: './apps/securities-subgraph/src/schema.gql',
      },
      buildSchemaOptions: {
        orphanedTypes: [Position],
      },
      graphiql: false,
      playground: false,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: false,
    }),
    SecuritiesModule,
    PricesModule,
  ],
  controllers: [],
  providers: [],
})
export class SecuritiesSubgraphModule {}
