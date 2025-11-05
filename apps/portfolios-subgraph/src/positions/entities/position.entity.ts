import {
  Directive,
  Field,
  Float,
  HideField,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { Portfolio } from '../../portfolios/entities/portfolio.entity';
import { Security } from './security.entity';

@ObjectType({ description: 'A position within a portfolio.' })
@Directive('@key(fields: "id")')
export class Position {
  /**
   * The unique identifier of the position.
   */
  @Field((_type) => ID)
  id: string;

  /**
   * The ID of the portfolio associated with the position.
   */
  @HideField()
  portfolioId: string;

  /**
   * The portfolio associated with the position.
   */
  portfolio: Portfolio;

  /**
   * The ID of the security associated with the position.
   */
  @HideField()
  securityId: string;

  /**
   * The quantity of the position.
   */
  @Field(() => Float)
  quantity: number;

  /**
   * The market value of the position.
   */
  @Field(() => Float)
  marketValue: number;

  /**
   * The security associated with the position.
   */
  security: Security;
}
