import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule, ConfigService } from '@app/common';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        server: {
          graphiql: false,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          includeStacktraceInErrorResponses: false,
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'clients-subgraph',
                url: configService.get<string>('CLIENTS_SUBGRAPH_GRAPHQL_URL'),
              },
              {
                name: 'portfolios-subgraph',
                url: configService.get<string>(
                  'PORTFOLIOS_SUBGRAPH_GRAPHQL_URL',
                ),
              },
              {
                name: 'securities-subgraph',
                url: configService.get<string>(
                  'SECURITIES_SUBGRAPH_GRAPHQL_URL',
                ),
              },
            ],
            logger: console,
            subgraphHealthCheck: true,
          }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
