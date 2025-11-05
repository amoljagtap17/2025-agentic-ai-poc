import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AccountsModule } from './accounts/accounts.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { Security } from './positions/entities/security.entity';
import { PositionsModule } from './positions/positions.module';
import { Client } from './shared/client.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: './apps/portfolios-subgraph/src/schema.gql',
      },
      buildSchemaOptions: {
        orphanedTypes: [Client, Security],
      },
      graphiql: false,
      playground: false,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      includeStacktraceInErrorResponses: false,
    }),
    AccountsModule,
    PortfoliosModule,
    PositionsModule,
  ],
  controllers: [],
  providers: [],
})
export class PortfoliosSubgraphModule {}
