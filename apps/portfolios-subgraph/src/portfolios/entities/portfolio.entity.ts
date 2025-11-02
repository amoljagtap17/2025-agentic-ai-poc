import { Directive, Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Position } from '../../positions/entities/position.entity';
import { Client } from '../../shared/client.entity';

@ObjectType({ description: 'A portfolio belonging to a client.' })
@Directive('@key(fields: "id")')
export class Portfolio {
  /**
   * The unique identifier of the portfolio.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The ID of the client who owns the portfolio.
   */
  @HideField()
  clientId: string;

  /**
   * The client who owns the portfolio.
   */
  client: Client;

  /**
   * The name of the portfolio.
   */
  name: string;

  /**
   * The positions within the portfolio.
   */
  positions: Position[];
}
