import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Account } from '../accounts/entities/account.entity';
import { Portfolio } from '../portfolios/entities/portfolio.entity';

@ObjectType({ description: 'A client who is a member of a household.' })
@Directive('@key(fields: "id")')
export class Client {
  /**
   * The unique identifier of the client.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The accounts belonging to the client.
   */
  accounts: Account[];

  /**
   * The portfolios belonging to the client.
   */
  portfolios: Portfolio[];
}
